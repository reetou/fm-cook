import React from 'react'
import { Switch, Text, View } from "react-native";
import { moderateScale } from 'react-native-size-matters';

export default function SwitchButton(props: any) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Switch
        {...props}
      />
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ marginLeft: moderateScale(8), fontWeight: '500', fontSize: moderateScale(14) }}>{props.label}</Text>
      </View>
    </View>
  )
}
