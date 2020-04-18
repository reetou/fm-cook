import React from 'react'
import { Text, View } from "react-native";
import { getColor, StatusColorType } from "../utils";

interface Props {
  text: string;
  type: StatusColorType;
  width?: number;
}

export default function SectionStatus(props: Props) {
  const width = props.width || 120
  return (
    <View>
      <View
        style={{
          width,
          backgroundColor: getColor(props.type),
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.1,
          borderRadius: 4,
          height: 24,
        }}
      />
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          fontSize: 24,
          color: getColor(props.type),
          textTransform: 'uppercase',
          paddingVertical: 4,
          paddingHorizontal: 8,
          fontWeight: 'bold',
          height: 24,
          width,
          textAlign: 'center',
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}
