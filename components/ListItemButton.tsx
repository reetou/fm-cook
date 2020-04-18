import React from 'react'
import { Text, TouchableOpacity } from "react-native";
import Styleguide from "../Styleguide";

export default function ListItemButton(props: any) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 5,
        paddingHorizontal: 11,
        backgroundColor: Styleguide.listItemButtonBackgroundColor,
        height: 28,
        borderRadius: 14
      }}
      {...props}
    >
      <Text
        style={{
          fontSize: 13,
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
