import React from 'react'
import { View, Text, Image } from "react-native";
import CircleButton from "./CircleButton";

export default function SubscriptionFeatureAdvantages() {
  const advantages = [
    'Неограниченные заказы',
    'Постоянный поток заказов',
    'Доступ к магазину контейнеров',
    'Поддержка 24/7'
  ]
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginVertical: 12 }}>Преимущества</Text>
      {
        advantages.map((a, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 12
            }}
          >
            <CircleButton
              type="success"
              disabled
              size={20}
              style={{
                marginRight: 6
              }}
            >
              <Image
                source={require('../assets/success.png')}
                style={{
                  width: 11,
                  height: 11
                }}
              />
            </CircleButton>
            <Text
              style={{ fontSize: 17, fontWeight: '500' }}
              adjustsFontSizeToFit
            >
              {a}
            </Text>
          </View>
        ))
      }
    </View>
  )
}
