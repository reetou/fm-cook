import React from 'react'
import { Platform, Text, View } from "react-native";
import { StatusColorType } from "../utils";
import Styleguide from "../Styleguide";
import { hexToRgb } from "../animatedUtils";

interface Props {
  text: string;
  type: StatusColorType;
  width?: number;
}

export default function SectionStatus(props: Props) {
  const width = props.width || 120
  const rgb = hexToRgb(Styleguide.getColorByType(props.type))
  return (
    <View>
      <View
        style={{
          borderRadius: 4,
          backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
          justifyContent: 'center',
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: Platform.OS === 'ios' ? 24 : 10.5,
            color: Styleguide.getColorByType(props.type),
            textTransform: 'uppercase',
            paddingVertical: 4,
            paddingHorizontal: 8,
            fontWeight: 'bold',
            height: 24,
            textAlign: 'center',
          }}
        >
          {props.text}
        </Text>
      </View>
    </View>
  )
}
