import React from 'react'
import { TouchableOpacity, Text } from "react-native";
import Styleguide from "../Styleguide";
import { moderateScale } from 'react-native-size-matters';

export default function Button(props: any) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(35),
        backgroundColor: Styleguide.buttonBackgroundColor,
        height: moderateScale(28),
        borderRadius: moderateScale(14)
      }}
      {...props}
    >
      <Text
        style={{
          fontSize: moderateScale(14),
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
