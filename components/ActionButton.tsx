import React from 'react'
import { TouchableOpacity, Text, View } from "react-native";
import Styleguide from "../Styleguide";
import { StatusColorType } from "../utils";
import { hexToRgb } from "../animatedUtils";

interface Props {
  text: string;
  color: StatusColorType;
  onPress: () => void;
  disabled?: boolean;
}

export default function ActionButton(props: Props) {
  const rgb = hexToRgb(Styleguide.getColorByType(props.color))
  return (
    <View style={{ paddingHorizontal: 6, flex: 1 }}>
      <TouchableOpacity
        disabled={props.disabled}
        style={{
          paddingVertical: 16,
          backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
          height: 52,
          borderRadius: 26,
        }}
        {...props}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 15,
            textAlign: 'center',
            color: Styleguide.getColorByType(props.color)
          }}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
