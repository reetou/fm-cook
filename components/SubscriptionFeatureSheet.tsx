import {
  Text,
  View
} from "react-native";
import Styleguide from "../Styleguide";
import React from "react";
import SubscriptionFeatureSection from "./SubscriptionFeatureSection";
import SubscriptionFeatureAdvantages from "./SubscriptionFeatureAdvantages";
import TouchableScale from 'react-native-touchable-scale';

interface Props {
  onPress: () => void;
  height: number;
  buttonText: string;
  disabled?: boolean;
}

export default function SubscriptionFeatureSheet(props: Props) {
  return (
    <View
      style={{
        height: props.height,
        backgroundColor: Styleguide.primaryBackgroundColor,
        padding: 20,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        justifyContent: 'flex-end'
      }}
    >
      <SubscriptionFeatureSection />
      <SubscriptionFeatureAdvantages />
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
    </View>
  )
}
