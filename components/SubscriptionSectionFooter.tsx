import React from 'react'
import { Text, View } from "react-native";
import Styleguide from "../Styleguide";
import TouchableScale from 'react-native-touchable-scale';

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
      <TouchableScale
        pressInFriction={10}
        pressOutFriction={10}
        disabled={props.disabled}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 40,
          backgroundColor: props.disabled ? Styleguide.disabledButtonBackgroundColor() : Styleguide.buttonBackgroundColor,
          borderRadius: 14
        }}
        onPress={props.onPress}
      >
        <View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 15,
              fontWeight: "600",
              textAlign: 'center',
              color: props.disabled ? Styleguide.tintColor : Styleguide.buttonTextColor
            }}
          >
            {props.text}
          </Text>
        </View>
      </TouchableScale>
    </View>
  )
}
