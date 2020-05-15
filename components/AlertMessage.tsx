import React from 'react'
import { Image, View, Text } from "react-native";
import Styleguide from "../Styleguide";

interface Props {
  text: string;
  color?: string;
}

export default function AlertMessage(props: Props) {
  const imageSize = 24
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: props.color || Styleguide.sectionWarningStatusColor,
        paddingVertical: 15,
        paddingHorizontal: 10
      }}
    >
      <Image
        source={require('../assets/alert.png')}
        width={imageSize}
        height={imageSize}
        style={{
          width: imageSize,
          height: imageSize,
          marginRight: 12
        }}
      />
      <Text style={{ color: Styleguide.buttonTextColor }}>{props.text}</Text>
    </View>
  )
}
