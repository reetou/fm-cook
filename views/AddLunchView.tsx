import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from "react-native";
import { Avatar, Input, List, ListItem } from "@ui-kitten/components";
import Styleguide from "../Styleguide";
import { productItemDescription, PRODUCTS_SCREENS, stringOrEmpty } from "../utils";
import UserContext from "../store/UserContext";
import Lunch from "../api/Lunch";
import AddLunchContext from "../store/AddLunchContext";
import * as ImagePicker from 'expo-image-picker';
import * as Sentry from "sentry-expo";
import EditableAvatar from "../components/EditableAvatar";


export default function AddLunchView({ route: { params }, navigation }) {
  const { setHasStaleData } = useContext(UserContext)
  const {
    name,
    price,
    meals,
    setName,
    setPrice,
    setMeals
  } = useContext(AddLunchContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any>(null)

  useEffect(() => {
    navigation.setOptions({
      title: params.header_title || 'Новый ланч'
    })
    setName(stringOrEmpty(params.name))
    setPrice(stringOrEmpty(params.price, '0'))
    setMeals(params.meals || [])
  }, [params])
  const submit = async () => {
    try {
      setLoading(true)
      let lunch
      const lunchData = {
        name: name || 'Без названия',
        price: Number(price),
        meals: meals.map(m => m.id),
      }
      if (params.id) {
        const data = await Lunch.updateLunch(params.id, lunchData, avatar ? avatar.uri : null)
        lunch = data.lunch
      } else {
        const data = await Lunch.addLunch(lunchData, avatar ? avatar.uri : null)
        lunch = data.lunch
      }
      setName(stringOrEmpty(lunch.name))
      setPrice(stringOrEmpty(lunch.price))
      setMeals(lunch.meals)
      setHasStaleData(true)
      Vibration.vibrate(300)
      navigation.popToTop()
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot submit', e)
    }
    setLoading(false)
  }
  const pickAvatar = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Ошибка', 'Не получено разрешение на доступ к галерее')
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 0.20,
      allowsEditing: true
    });
    if (pickerResult.cancelled) {
      setAvatar(null)
    } else {
      setAvatar(pickerResult)
    }
  }
  return (
    <FlatList
      style={{
        paddingVertical: 10
      }}
      ListHeaderComponent={(
        <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <EditableAvatar
              onPress={pickAvatar}
              size={160}
              source={
                avatar || (
                  params.image_url ? { uri: params.image_url } : null
                )
              }
            />
          </View>
          <Input
            label="Название"
            placeholder="Выберите красивое имя"
            value={name}
            editable={!loading}
            onChangeText={setName}
            maxLength={128}
          />
          <Input
            label="Цена в рублях"
            placeholder="Комбо обычно дешевле чем блюда по отдельности"
            value={price}
            editable={!loading}
            keyboardType="number-pad"
            onChangeText={setPrice}
            maxLength={128}
          />
        </View>
      )}
      ListFooterComponent={(
        <React.Fragment>
          <TouchableOpacity
            disabled={loading}
            style={{
              marginTop: 30,
              paddingVertical: 12,
              marginHorizontal: 20,
              backgroundColor: loading ? Styleguide.tintColor : Styleguide.secondaryColor,
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.navigate(PRODUCTS_SCREENS.SELECT_MEALS, {
                selectedMeals: meals
              })
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: Styleguide.primaryBackgroundColor,
              }}
            >
              Выбрать блюда
            </Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 30 }}>
            <TouchableOpacity
              disabled={loading}
              style={{
                marginTop: 30,
                paddingVertical: 12,
                marginHorizontal: 20,
                backgroundColor: loading ? Styleguide.tintColor : Styleguide.primaryColor,
                borderRadius: 20,
              }}
              onPress={submit}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: Styleguide.primaryBackgroundColor,
                }}
              >
                { params.id ? 'Обновить' : 'Сохранить' }
              </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}
      data={meals}
      renderItem={({ item, index }) => (
        <ListItem
          key={`${item.id}_${index}`}
          title={`${item.name}`}
          description={productItemDescription(item as any)}
        />
      )}
    />
  )
}
