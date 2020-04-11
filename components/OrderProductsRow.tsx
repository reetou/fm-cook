import React from 'react'
import { View, Text, FlatList } from "react-native";
import { Avatar } from "@ui-kitten/components";

const DEFAULT_ICON = require('../assets/icon.png')

export default function OrderProductsRow({ meals, lunches }: any) {
  return (
    <FlatList
      style={{
        marginTop: 10
      }}
      horizontal
      keyExtractor={(item, index) => `${item.id}${index}`}
      data={meals.concat(lunches)}
      renderItem={({ item }: any) => (
        <View>
          <Avatar
            source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
          />
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: 6,
          }}
        >
          <View
            style={{
              opacity: 0.3,
              width: 2,
              height: 20,
              backgroundColor: 'gray'
            }}
          />
        </View>
      )}
    />
  )
}
