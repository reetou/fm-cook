import React from 'react'
import { Switch, Text, View } from "react-native";

export default function SwitchButton(props: any) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Switch
        {...props}
      />
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ marginLeft: 8, fontWeight: '500' }}>{props.label}</Text>
      </View>
    </View>
  )
}
