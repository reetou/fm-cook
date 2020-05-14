import {
  Text,
  View
} from "react-native";
import Styleguide from "../Styleguide";
import React from "react";
import SubscriptionFeatureAdvantages from "./SubscriptionFeatureAdvantages";
import ScaleButton from "./ScaleButton";
import AnimatedLogo from "./AnimatedLogo";

interface Props {
  onPress: () => void;
  height?: number;
  buttonText: string;
  disabled?: boolean;
}

export default function SubscriptionFeatureSheet(props: Props) {
  return (
    <View
      style={{
        backgroundColor: Styleguide.primaryBackgroundColor,
        padding: 20,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        justifyContent: 'flex-end',
        ...props.height ? {
          height: props.height,
        } : {},
      }}
    >
      <AnimatedLogo />
      <SubscriptionFeatureAdvantages />
      <ScaleButton
        onPress={props.onPress}
        buttonText={props.buttonText}
        disabled={props.disabled}
      />
    </View>
  )
}
