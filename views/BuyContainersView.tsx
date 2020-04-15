import React, { useEffect, useState } from 'react'
import {
  ScrollView, Text, TouchableOpacity, View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Styleguide from "../Styleguide";
import Shop from "../api/Shop";
import * as Sentry from "sentry-expo";


export default function BuyContainersView({ route: { params }, navigation }) {
  const [amount, setAmount] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const getPrices = async () => {
    setLoading(true)
    try {
      const data = await Shop.getPrices()
      setPrice(data.container_pack)
      setQuantity(data.container_pack_quantity)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get prices')
    }
    setLoading(false)
  }
  useEffect(() => {
    getPrices()
  }, [])
  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ marginVertical: 10 }}>
        <Text>Контейнеры продаются наборами по {quantity} штук.</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text style={{ width: '30%' }}>Наборов: </Text>
        <RNPickerSelect
          disabled={loading}
          touchableWrapperProps={{
            style: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
            },
          }}
          textInputProps={{
            style: {
              width: 60,
              paddingVertical: 10,
              textAlign: 'center',
              color: Styleguide.primaryBackgroundColor,
              backgroundColor: Styleguide.secondaryColor,
              borderRadius: 20
            },
          }}
          placeholder={{}}
          value={amount}
          onValueChange={(value) => {
            setAmount(value)
          }}
          items={
            new Array(9)
              .fill(0)
              .map((_, i) => ({
                value: i + 1,
                label: String(i + 1)
              }))
          }
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
      >
        <Text
          style={{
            textAlign: 'center',
            color: Styleguide.primaryBackgroundColor,
          }}
        >
          Купить {amount} набор(-ов) за {amount * price} рублей
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
