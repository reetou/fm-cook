import React from 'react'
import { View, Text, Image } from "react-native";
import CircleButton from "./CircleButton";
import { moderateScale } from 'react-native-size-matters';

export default function SubscriptionFeatureAdvantages() {
  const advantages = [
    'Неограниченные заказы',
    'Поддержка 24/7',
    'Работайте, когда удобно'
  ]
  return (
    <View style={{ marginBottom: moderateScale(12) }}>
      <Text style={{ fontSize: moderateScale(24), fontWeight: '600', marginVertical: moderateScale(12) }}>Преимущества</Text>
      {
        advantages.map((a, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: moderateScale(12)
            }}
          >
            <CircleButton
              type="success"
              disabled
              size={moderateScale(20)}
              style={{
                marginRight: moderateScale(6)
              }}
            >
              <Image
                source={require('../assets/success.png')}
                style={{
                  width: moderateScale(11),
                  height: moderateScale(11)
                }}
              />
            </CircleButton>
            <Text
              style={{ fontSize: moderateScale(17), fontWeight: '500' }}
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
