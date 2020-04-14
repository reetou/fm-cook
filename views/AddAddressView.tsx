import React, { useContext, useEffect, useState } from 'react'
import {
  Alert,
  ScrollView, Text, TouchableOpacity, View
} from "react-native";
import { Autocomplete, Input } from "@ui-kitten/components";
import useDebounce from "react-use/lib/useDebounce";
import Geo from "../api/Geo";
import Styleguide from "../Styleguide";
import User from "../api/User";
import UserContext from "../store/UserContext";


export default function AddAddressView({ route: { params }, navigation }) {
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [flat, setFlat] = useState<string>('')
  const [floor, setFloor] = useState<string>('')
  const [house, setHouse] = useState<string>('')
  const [intercom, setIntercom] = useState<string>('')

  useEffect(() => {
    if (!user.address) return
    fillAddress(user.address)
  }, [])

  const fillAddress = (address: any) => {
    const prettyAddress = address.street ? `${address.city ? address.city + ', ' : ''} ${address.street} ${address.house || ''}` : ''
    setValue(prettyAddress)
    setFlat(address.flat || '')
    setFloor(address.floor || '')
    setIntercom(address.intercom || '')
    setHouse(address.house || '')
    getSuggestions()
  }

  const getSuggestions = async (count?: number) => {
    setLoading(true)
    try {
      const data = await Geo.getSuggestionsByQuery(value, count)
      setSuggestions(data.suggestions.map(s => ({...s, title: s.value})))
      setLoading(false)
      return data
    } catch (e) {
      console.error('Cannot get suggestions', e)
    }
    setLoading(false)
  }

  const addAddress = async () => {
    setLoading(true)
    try {
      const data = await getSuggestions(1)
      const suggest = data.suggestions[0]
      if (!suggest || !suggest.data.geo_lon) {
        Alert.alert('Ошибка', 'Укажите более точный адрес')
        return
      }
      const address = {
        country: suggest.data.country,
        city: suggest.data.city,
        city_district: suggest.data.city_district,
        street: suggest.data.street_with_type,
        house: house || suggest.data.house,
        region: suggest.data.region,
        flat,
        floor,
        intercom,
        location: {
          lat: Number(suggest.data.geo_lat),
          lon: Number(suggest.data.geo_lon)
        }
      }
      setLoading(true)
      const res = await User.addAddress(address)
      if (res.address) {
        fillAddress(res.address)
        setUser({
          ...user,
          address: res.address
        })
      }
      setLoading(false)
      navigation.goBack()
      Alert.alert('Успешно', 'Адрес обновлен')
    } catch (e) {
      console.error('Cannot add address', e)
      Alert.alert('Ошибка', 'Не удалось обновить адрес, попробуйте позднее')
    }
    setLoading(false)
  }

  const onSelect = ({ title, data }) => {
    setValue(title);
    if (data.house) {
      setHouse(data.house)
    } else {
      setHouse('')
    }
  }
  const [, cancel] = useDebounce(
    () => {
      getSuggestions()
    },
    300,
    [value]
  );
  return (
    <ScrollView
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      <Autocomplete
        label="Адрес"
        placeholder="Начните вводить"
        value={value}
        data={suggestions}
        onChangeText={setValue}
        onSelect={onSelect}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Input
          label="Дом"
          editable={!loading}
          maxLength={6}
          style={{ width: 70 }}
          keyboardType="number-pad"
          value={house}
          onChangeText={setHouse}
        />
        <Input
          label="Квартира"
          editable={!loading}
          maxLength={6}
          style={{ width: 70 }}
          keyboardType="number-pad"
          value={flat}
          onChangeText={setFlat}
        />
        <Input
          label="Этаж"
          editable={!loading}
          maxLength={6}
          value={floor}
          style={{ width: 70 }}
          keyboardType="number-pad"
          onChangeText={setFloor}
        />
        <Input
          label="Домофон"
          editable={!loading}
          maxLength={6}
          value={intercom}
          style={{ width: 70 }}
          keyboardType="number-pad"
          onChangeText={setIntercom}
        />
      </View>
      <TouchableOpacity
        disabled={loading}
        style={{
          marginTop: 30,
          paddingVertical: 12,
          marginHorizontal: 20,
          backgroundColor: loading ? Styleguide.tintColor : Styleguide.primaryColor,
          borderRadius: 20,
        }}
        onPress={addAddress}
      >
        <Text
          style={{
            textAlign: 'center',
            color: Styleguide.primaryBackgroundColor,
          }}
        >
          {user.address ? 'Обновить' : 'Добавить'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
