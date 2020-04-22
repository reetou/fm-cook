import TouchableScale from "react-native-touchable-scale";
import { Platform, Text, View } from "react-native";
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
      disabled={props.disabled}
      {...Platform.OS === 'android' ? {
        // На андроиде почему-то внутри модалки чтобы кнопка нажалась нужно или зажать
        // или добавить onPressIn
        onPressIn: props.onPress,
        useNativeDriver: false,
        pressInTension: 5,
        tension: 5
      } : {
        onPress: props.onPress
      }}
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
