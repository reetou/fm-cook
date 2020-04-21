import React from 'react'
import { Text, View } from "react-native";
import Styleguide from "../Styleguide";
import TouchableScale from 'react-native-touchable-scale';
import ScaleButton from "./ScaleButton";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

export default function SubscriptionSectionFooter(props: Props) {
  return (
    <View style={{ marginBottom: -10, marginHorizontal: -20 }}>
      <View
        style={{
          height: 1,
          marginVertical: 15,
          backgroundColor: Styleguide.sectionBorderColor
        }}
      />
      <ScaleButton
        onPress={props.onPress}
        buttonText={props.text}
        disabled={props.disabled}
      />
    </View>
  )
}
