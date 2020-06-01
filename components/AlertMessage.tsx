import React from 'react'
import { Image, View, Text } from "react-native";
import Styleguide from "../Styleguide";
import { moderateScale } from 'react-native-size-matters';

interface Props {
  text: string;
  color?: string;
}

export default function AlertMessage(props: Props) {
  const imageSize = moderateScale(24)
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: props.color || Styleguide.sectionWarningStatusColor,
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(10)
      }}
    >
      <Image
        source={require('../assets/alert.png')}
        width={imageSize}
        height={imageSize}
        style={{
          width: imageSize,
          height: imageSize,
          marginRight: moderateScale(12)
        }}
      />
      <Text style={{ color: Styleguide.buttonTextColor, fontSize: moderateScale(14) }}>{props.text}</Text>
    </View>
  )
}
