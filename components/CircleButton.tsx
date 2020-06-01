import React, { ReactNode } from 'react'
import { TouchableOpacity } from "react-native";
import { StatusColorType } from "../utils";
import Styleguide from "../Styleguide";
import { moderateScale } from 'react-native-size-matters';

interface Props {
  type: StatusColorType;
  children: ReactNode;
  disabled?: boolean;
  size?: number;
  margin?: number;
  style?: any;
  onPress?: () => void;
}

export default function CircleButton(props: Props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={{
        borderRadius: moderateScale(30),
        height: moderateScale(props.size || 36),
        width: moderateScale(props.size || 36),
        backgroundColor: Styleguide.getColorByType(props.type),
        justifyContent: 'center',
        alignItems: 'center',
        margin: moderateScale(props.margin || 0),
        ...props.style,
      }}
    >
      {props.children}
    </TouchableOpacity>
  )
}
