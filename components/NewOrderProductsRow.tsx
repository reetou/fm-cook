import React from 'react'
import { View, Text, Image, FlatList } from "react-native";

const DEFAULT_ICON = require('../assets/icon.png')

export default function NewOrderProductsRow({ meals, lunches }: any) {
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
          <Image
            source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
            style={{
              width: 140,
              height: 90,
              borderRadius: 12
            }}
          />
          <Text adjustsFontSizeToFit style={{ marginVertical: 10, fontSize: 13 }}>{item.name}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: 6,
          }}
        />
      )}
    />
  )
}
