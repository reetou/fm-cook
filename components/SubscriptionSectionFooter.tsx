import React from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import Styleguide from "../Styleguide";

interface Props {
  onPress: () => void;
  text: string;
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
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingHorizontal: 40,
          backgroundColor: Styleguide.buttonBackgroundColor,
          borderRadius: 14
        }}
        onPress={props.onPress}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: 15,
            fontWeight: "600",
            textAlign: 'center',
            color: Styleguide.buttonTextColor
          }}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
