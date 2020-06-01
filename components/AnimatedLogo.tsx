import React from 'react'
import { Platform, View, Image } from "react-native";
import LottieView from "lottie-react-native";
import { moderateScale } from 'react-native-size-matters';

export default function AnimatedLogo() {
  return (
    <View
      style={{
        height: moderateScale(130),
        alignItems: 'center',
      }}
    >
      {
        Platform.OS === 'ios'
          ? (
            <LottieView
              autoPlay
              loop={false}
              source={require('../assets/lottie/logo.json')}
            />
          )
          : (
            <View>
              <Image
                source={require('../assets/icon.png')}
                style={{
                  height: moderateScale(200)
                }}
              />
            </View>
          )
      }
    </View>
  )
}
