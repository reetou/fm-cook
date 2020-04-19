import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import Styleguide from "../Styleguide";
import { Image, Text, View } from "react-native";

export default function SubscriptionFeatureSection() {
  return (
    <LinearGradient
      colors={[Styleguide.secondaryColor, Styleguide.primaryColor]}
      start={[0.2, 0.2]}
      style={{
        padding: 12,
        borderRadius: 14
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Image
          source={require('../assets/icon_sheet.png')}
          style={{
            width: 68,
            height: 68,
            marginRight: 24
          }}
        />
        <Image
          source={require('../assets/borsch.png')}
          style={{
            width: 126,
            height: 32,
          }}
        />
      </View>
      <Text
        numberOfLines={2}
        style={{
          marginVertical: 12,
          paddingHorizontal: 20,
          color: Styleguide.primaryBackgroundColor,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 17
        }}
      >
        Полный доступ к аккаунту повара на 14 дней
      </Text>
    </LinearGradient>
  )
}
