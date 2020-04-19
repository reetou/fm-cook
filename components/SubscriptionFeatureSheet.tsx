import {
  Text, TouchableOpacity,
  View
} from "react-native";
import Styleguide from "../Styleguide";
import React from "react";
import SubscriptionFeatureSection from "./SubscriptionFeatureSection";
import SubscriptionFeatureAdvantages from "./SubscriptionFeatureAdvantages";

interface Props {
  onPress: () => void;
  height: number;
  buttonText: string;
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
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            paddingVertical: 15,
            backgroundColor: Styleguide.buttonBackgroundColor,
            borderRadius: 14
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '600',
              color: Styleguide.buttonTextColor
            }}
          >
            {props.buttonText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
