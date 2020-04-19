import React, { ReactNode } from 'react'
import { TouchableOpacity } from "react-native";
import { StatusColorType } from "../utils";
import Styleguide from "../Styleguide";

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
        backgroundColor: Styleguide.getColorByType(props.type),
        justifyContent: 'center',
        alignItems: 'center',
        margin: props.margin || 0
      }}
    >
      {props.children}
    </TouchableOpacity>
  )
}
