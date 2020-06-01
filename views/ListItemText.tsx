import React from 'react'
import { Text, View } from "react-native";
import Styleguide from "../Styleguide";
import { moderateScale } from 'react-native-size-matters';

interface Props {
  title: string;
  text: string;
}

export default function ListItemText(props: Props) {
  return (
    <View style={{ marginVertical: moderateScale(12) }}>
      <Text
        style={{
          fontSize: moderateScale(24),
          fontWeight: 'bold'
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: moderateScale(17),
          fontWeight: '500',
          color: Styleguide.listItemTextColor
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}
