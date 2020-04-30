import React from 'react'
import { View, Text, Image, TouchableHighlight } from "react-native";
import { productItemDescription } from "../utils";
import Styleguide from "../Styleguide";

const DEFAULT_ICON = require('../assets/icon.png')

interface Props {
  item: any;
  onPress: () => void;
  disabled: boolean;
}

export default function ProductItem(props: Props) {
  const { item } = props
  return (
    <TouchableHighlight
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View
        style={{
          padding: 10,
          flex: 1,
          flexDirection: 'row',
          backgroundColor: Styleguide.primaryBackgroundColor,
          alignItems: 'center'
        }}
      >
        <Image
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
          source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
          defaultSource={DEFAULT_ICON}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
            }}
            adjustsFontSizeToFit
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 13
            }}
          >
            {productItemDescription(item)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}
