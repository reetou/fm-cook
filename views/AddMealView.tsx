import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity, TouchableWithoutFeedback, Vibration,
  View
} from "react-native";
import { Avatar, Input, Toggle } from "@ui-kitten/components";
import Styleguide from "../Styleguide";
import Meal from "../api/Meal";
import { stringOrEmpty } from "../utils";
import UserContext from "../store/UserContext";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const DEFAULT_ICON = require('../assets/icon.png')


export default function AddMealView({ route: { params }, navigation }) {
  const { setHasStaleData } = useContext(UserContext)
  const [name, setName] = useState<string>(stringOrEmpty(params.name))
  const [price, setPrice] = useState<string>(stringOrEmpty(params.price))
  const [weight, setWeight] = useState<string>(stringOrEmpty(params.weight))
  const [calories, setCalories] = useState<string>(stringOrEmpty(params.calories))
  const [available, setAvailable] = useState<boolean>(Boolean(params.available))
  const [portions, setPortions] = useState<number>(params.portions || 0)
  const [avatar, setAvatar] = useState<any>(null)

  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    navigation.setOptions({
      title: params.header_title || 'Новое блюдо'
    })
  }, [params])
  const submit = async () => {
    try {
      setLoading(true)
      let meal
      const mealData = {
        name: name || 'Без названия',
        price: Number(price),
        available: Boolean(available),
        ...weight ? { weight: Number(weight) } : {},
        ...calories ? { calories: Number(calories) } : {},
        portions: Number(portions),
      }
      if (params.id) {
        const data = await Meal.updateMeal(params.id, mealData, avatar ? avatar.uri : null)
        meal = data.meal
      } else {
        const data = await Meal.addMeal(mealData, avatar ? avatar.uri : null)
        meal = data.meal
      }
      setName(stringOrEmpty(meal.name))
      setCalories(stringOrEmpty(meal.calories))
      setWeight(stringOrEmpty(meal.weight))
      setPrice(stringOrEmpty(meal.price))
      setHasStaleData(true)
      Vibration.vibrate(300)
      navigation.popToTop()
    } catch (e) {
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
  const ref = useRef()
  return (
    <ScrollView
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback
            onPress={pickAvatar}
          >
            <Avatar
              style={{
                width: 160,
                height: 160
              }}
              size="giant"
              source={
                avatar || (
                  params.image_url ? { uri: params.image_url } : DEFAULT_ICON
                )
              }
              defaultSource={DEFAULT_ICON}
            />
          </TouchableWithoutFeedback>
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
          label="Цена"
          placeholder="В рублях"
          value={price}
          editable={!loading}
          keyboardType="number-pad"
          onChangeText={setPrice}
          maxLength={128}
        />
        <Input
          label="Вес в граммах (необязательно)"
          value={weight}
          editable={!loading}
          keyboardType="number-pad"
          onChangeText={setWeight}
          maxLength={128}
        />
        <Input
          label="Калории (необязательно)"
          value={calories}
          editable={!loading}
          keyboardType="number-pad"
          onChangeText={setCalories}
          maxLength={128}
        />
        <Input
          label="Порций"
          value={String(portions)}
          editable={!loading}
          keyboardType="number-pad"
          onChangeText={(v) => setPortions(Number(v))}
          maxLength={128}
        />
        <View style={{ alignItems: 'flex-start' }}>
          <Toggle
            disabled={loading}
            style={{
              marginTop: 10,
            }}
            checked={available}
            onChange={setAvailable}
            text="Доступно для заказа"
            status="success"
          />
        </View>
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
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
