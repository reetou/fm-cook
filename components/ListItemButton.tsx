import React from 'react'
import { Text, TouchableOpacity } from "react-native";
import Styleguide from "../Styleguide";
import { moderateScale } from 'react-native-size-matters';

export default function ListItemButton(props: any) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(11),
        backgroundColor: Styleguide.listItemButtonBackgroundColor,
        height: moderateScale(28),
        borderRadius: moderateScale(14)
      }}
      {...props}
    >
      <Text
        style={{
          fontSize: moderateScale(13),
          textTransform: 'uppercase',
          fontWeight: '600',
          color: Styleguide.listItemButtonTextColor
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}
