import React, { useState } from 'react'
import { Text, TouchableOpacity } from "react-native";
import { getOrderStatusColor, getOrderStatusTitle } from "../utils";
import Styleguide from "../Styleguide";

interface OrderStatusButtonProps {
  disabled?: boolean;
  status: string;
  order_id: string;
  onPress: () => void;
}

export default function OrderStatusButton(props: OrderStatusButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
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
