import React, { useContext, useEffect, useState } from 'react'
import { Alert, Vibration, View, Text, TextInput, FlatList, ScrollView, TouchableOpacity } from "react-native";
import Styleguide from "../Styleguide";
import {
  getErrorDetail,
  PRODUCTS_SCREENS,
  stringOrEmpty,
} from "../utils";
import UserContext from "../store/UserContext";
import Lunch from "../api/Lunch";
import AddLunchContext from "../store/AddLunchContext";
import * as ImagePicker from 'expo-image-picker';
import * as Sentry from "sentry-expo";
import Section from "../components/Section";
import SwitchButton from "../components/SwitchButton";
import EditableAvatar from "../components/EditableAvatar";
import TouchableScale from 'react-native-touchable-scale';
import PlusIcon from '../assets/plus_bg.svg'
import RemoveIcon from '../assets/remove.svg'
import ScaleButton from "../components/ScaleButton";
import AlertMessage from "../components/AlertMessage";
import askCameraRollPermission from "../askCameraRollPermission";
import { moderateScale } from 'react-native-size-matters';


export default function NewAddLunchView({ route: { params }, navigation }) {
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
  const [available, setAvailable] = useState<boolean>(Boolean(params.available))

  useEffect(() => {
    navigation.setOptions({
      title: params.header_title || 'Новое комбо'
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
      let toggleAvailableData = null
      if (available !== params.available && params.allowEditActivity) {
        toggleAvailableData = {
          available
        }
      }
      if (params.id) {
        const data = await Lunch.updateLunch(params.id, lunchData, avatar ? avatar.uri : null, toggleAvailableData)
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
      Alert.alert('Ошибка', getErrorDetail(e))
      console.error('Cannot submit', e)
    }
    setLoading(false)
  }
  const pickAvatar = async () => {
    const hasAccess = await askCameraRollPermission()
    if (!hasAccess) return

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
  const onRemoveMeal = (index: number) => {
    setMeals(
      meals
        .slice(0, index)
        .concat(meals.slice(index + 1))
    )
  }
  const onAddMeal = () => {
    navigation.navigate(PRODUCTS_SCREENS.SELECT_MEALS, {
      selectedMeals: meals
    })
  }
  const lunchAvailable = meals.every(m => m.available)
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View>
        {
          meals.some(m => m.portions < 1)
            ? (
              <AlertMessage text="У одного из блюд недостаточно порций" />
            )
            : null
        }
        {
          params.allowEditActivity
            ? (
              <Section
                title={lunchAvailable ? 'Можно заказать' : 'Нельзя заказать'}
                style={{ borderColor: 'transparent' }}
                footer={(
                  <View style={{ marginTop: moderateScale(20) }}>
                    <Text style={{ marginBottom: moderateScale(15), fontSize: moderateScale(14) }}>
                      Покупатели могут заказать это комбо, если оно активно
                    </Text>
                    <SwitchButton
                      disabled={loading}
                      value={available}
                      onValueChange={setAvailable}
                      label="Сделать активным"
                    />
                    <Text style={{ marginTop: moderateScale(15) }}>
                      {'* Активируя комбо, вы делаете все блюда в его составе активными в вашем меню'}
                    </Text>
                  </View>
                )}
              />
            )
            : null
        }
        <View
          style={{
            marginTop: moderateScale(10),
            backgroundColor: Styleguide.primaryBackgroundColor,
            flexDirection: 'row',
            paddingVertical: moderateScale(13),
            paddingHorizontal: moderateScale(15),
            shadowColor: "#BDBDBD",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.37,
            shadowRadius: 2.5,
            elevation: 1.5,
          }}
        >
          {/*<View style={{ marginRight: 20 }}>*/}
          {/*  <EditableAvatar*/}
          {/*    disabled={loading}*/}
          {/*    onPress={pickAvatar}*/}
          {/*    source={*/}
          {/*      avatar || (*/}
          {/*        params.image_url ? { uri: params.image_url } : null*/}
          {/*      )*/}
          {/*    }*/}
          {/*    size={66}*/}
          {/*  />*/}
          {/*</View>*/}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              editable={!loading}
              returnKeyType="done"
              placeholder="Название"
              value={name}
              onChangeText={setName}
              style={{
                fontSize: moderateScale(17),
                height: moderateScale(32),
              }}
            />
            <View style={{ backgroundColor: 'rgba(60, 60, 67, 0.29)', height: 1, marginRight: -20 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <TextInput
                value="₽"
                style={{
                  fontSize: moderateScale(17),
                  height: moderateScale(32),
                  width: moderateScale(20)
                }}
                editable={false}
              />
              <TextInput
                editable={!loading}
                returnKeyType="done"
                placeholder="Цена"
                value={price}
                keyboardType="number-pad"
                onChangeText={setPrice}
                maxLength={5}
                style={{
                  fontSize: moderateScale(17),
                  height: moderateScale(32),
                  flex: 1,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ marginVertical: moderateScale(20) }}>
          <Text style={{ paddingLeft: moderateScale(20), fontSize: moderateScale(20), fontWeight: '500' }}>
            Состав комбо
          </Text>
        </View>
      </View>
      <FlatList
        data={meals}
        horizontal
        keyExtractor={(item, index) => `${item.id}_${index}`}
        ListHeaderComponent={() => (
          <View style={{ marginHorizontal: moderateScale(20), justifyContent: 'center', flex: 1 }}>
            <TouchableOpacity
              disabled={loading}
              onPress={onAddMeal}
              style={{
                shadowColor: "#BDBDBD",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.37,
                shadowRadius: 2.5,
                elevation: 1.5,
              }}
            >
              <PlusIcon style={{ height: moderateScale(16), width: moderateScale(16) }} />
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableScale
            friction={10}
            style={{
              borderRadius: moderateScale(12),
              backgroundColor: Styleguide.primaryBackgroundColor,
              padding: moderateScale(12),
              width: moderateScale(250),
              height: moderateScale(120),
              marginRight: moderateScale(10),
              marginVertical: moderateScale(10),
              justifyContent: 'space-between',
              shadowColor: "#BDBDBD",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.37,
              shadowRadius: 2.5,
              elevation: 1.5,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  width: '70%',
                  fontSize: moderateScale(17),
                  fontWeight: '500'
                }}
              >
                {item.name}
              </Text>
              <TouchableOpacity
                disabled={loading}
                style={{
                  padding: moderateScale(8),
                  margin: moderateScale(-8)
                }}
                onPress={() => {
                  onRemoveMeal(index)
                }}
              >
                <RemoveIcon
                  width={moderateScale(24)}
                  height={moderateScale(24)}
                  style={{
                    width: moderateScale(24),
                    height: moderateScale(24),
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}
            >
              <Text
                adjustsFontSizeToFit
                style={{
                  color: Styleguide.listItemTextColor,
                  width: '70%',
                  fontSize: moderateScale(14)
                }}
              >
                {item.portions} порций доступно для заказа
              </Text>
              <Text style={{ fontSize: moderateScale(14) }}>{`${item.price} ₽`}</Text>
            </View>
          </TouchableScale>
        )}
      />
      <View
        style={{
          marginTop: moderateScale(30),
          marginBottom: moderateScale(50),
          paddingHorizontal: moderateScale(70)
        }}
      >
        <ScaleButton
          disabled={loading}
          onPress={submit}
          buttonText="Сохранить"
          style={{
            backgroundColor: Styleguide.sectionSuccessStatusColor,
            paddingVertical: moderateScale(20),
            borderRadius: moderateScale(60),
          }}
        />
      </View>
    </ScrollView>
  )
}
