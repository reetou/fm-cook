import React from 'react'
import { View } from "react-native";
import Styleguide from "../Styleguide";

interface Props {
  active: boolean;
  size?: number;
}

const getColor = (active: boolean) => {
  if (active) {
    return Styleguide.dutyStatusActiveColor
  }
  return Styleguide.dutyStatusNotActiveColor
}

const getTintColor = (active: boolean) => {
  if (active) {
    return Styleguide.dutyStatusActiveTintColor
  }
  return Styleguide.dutyStatusNotActiveTintColor
}

export default function DutyStatus(props: Props) {
  const size = props.size || 20
  const borderRadius = 30
  return (
    <View
      style={{
        backgroundColor: getTintColor(props.active),
        width: size,
        height: size,
        borderRadius,
        marginHorizontal: 8
      }}
    >
      <View
        style={{
          backgroundColor: getColor(props.active),
          height: size / 2,
          width: size / 2,
          borderRadius,
          marginLeft: size / 4,
          marginTop: size / 4
        }}
      />
    </View>
  )
}
