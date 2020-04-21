import TouchableScale from "react-native-touchable-scale";
import { Text, View } from "react-native";
import Styleguide from "../Styleguide";
import React from "react";

interface Props {
  onPress: () => void;
  disabled?: boolean;
  buttonText: string;
}

export default function ScaleButton(props: Props) {
  return (
    <TouchableScale
      pressInFriction={10}
      pressOutFriction={10}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <View
        style={{
          paddingVertical: 15,
          backgroundColor: props.disabled ? Styleguide.disabledButtonBackgroundColor() : Styleguide.buttonBackgroundColor,
          borderRadius: 14
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '600',
            color: props.disabled ? Styleguide.tintColor : Styleguide.buttonTextColor
          }}
        >
          {props.buttonText}
        </Text>
      </View>
    </TouchableScale>
  )
}
