import React from 'react'
import { Text, View } from "react-native";
import Styleguide from "../Styleguide";

interface Props {
  title: string;
  text: string;
}

export default function ListItemText(props: Props) {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold'
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '500',
          color: Styleguide.listItemTextColor
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}
