import React from 'react'
import { Text, TouchableOpacity } from "react-native";
import { getOrderStatusColor, getOrderStatusTitle } from "../utils";
import Styleguide from "../Styleguide";

export default function OrderStatusButton(props: any) {
  return (
    <TouchableOpacity
      style={{
        marginTop: 30,
        paddingVertical: 12,
        marginHorizontal: 20,
        backgroundColor: props.disabled ? Styleguide.tintColor : getOrderStatusColor(props.status),
        borderRadius: 20,
      }}
      {...props}
    >
      <Text
        style={{
          textAlign: 'center',
          color: Styleguide.primaryBackgroundColor,
        }}
      >
        {getOrderStatusTitle(props.status)}
      </Text>
    </TouchableOpacity>
  )
}
