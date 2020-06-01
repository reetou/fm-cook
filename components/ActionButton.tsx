import React from 'react'
import { TouchableOpacity, Text, View } from "react-native";
import Styleguide from "../Styleguide";
import { StatusColorType } from "../utils";
import { hexToRgb } from "../animatedUtils";
import TouchableScale from 'react-native-touchable-scale';
import { moderateScale } from 'react-native-size-matters';

interface Props {
  text: string;
  color: StatusColorType;
  onPress: () => void;
  disabled?: boolean;
}

export default function ActionButton(props: Props) {
  const rgb = hexToRgb(Styleguide.getColorByType(props.color))
  const disabledRgb = hexToRgb(Styleguide.tintColor)
  return (
    <View style={{ paddingHorizontal: moderateScale(6), flex: 1 }}>
      <TouchableScale
        pressInFriction={10}
        pressOutFriction={10}
        disabled={props.disabled}
        style={{
          paddingVertical: moderateScale(16),
          backgroundColor: props.disabled ? `rgba(${disabledRgb.r}, ${disabledRgb.g}, ${disabledRgb.b}, 0.2)` : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
          height: moderateScale(52),
          borderRadius: moderateScale(26),
        }}
        {...props}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: moderateScale(15),
            textAlign: 'center',
            color: props.disabled ? Styleguide.tintColor : Styleguide.getColorByType(props.color)
          }}
        >
          {props.text}
        </Text>
      </TouchableScale>
    </View>
  )
}
