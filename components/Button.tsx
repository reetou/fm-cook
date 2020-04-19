import React from 'react'
import { TouchableOpacity, Text } from "react-native";
import Styleguide from "../Styleguide";

export default function Button(props: any) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 5,
        paddingHorizontal: 35,
        backgroundColor: Styleguide.buttonBackgroundColor,
        height: 28,
        borderRadius: 14
      }}
      {...props}
    >
      <Text
        style={{
          textTransform: 'uppercase',
          fontWeight: '600',
          color: Styleguide.buttonTextColor
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}
