import React, { ReactChildren, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { getColor, StatusColorType } from "../utils";

interface Props {
  type: StatusColorType;
  children: ReactNode;
  disabled?: boolean;
  size?: number;
  margin?: number;
}

export default function CircleButton(props: Props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{
        borderRadius: 30,
        height: props.size || 36,
        width: props.size || 36,
        backgroundColor: getColor(props.type),
        justifyContent: 'center',
        alignItems: 'center',
        margin: props.margin || 0
      }}
    >
      {props.children}
    </TouchableOpacity>
  )
}
