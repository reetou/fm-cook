import React from 'react'
import { View, Text, Image, FlatList } from "react-native";
import { uniqBy } from "lodash-es";
import { moderateScale } from 'react-native-size-matters';

const DEFAULT_ICON = require('../assets/icon.png')

export default function NewOrderProductsRow({ meals, lunches }: any) {
  return (
    <FlatList
      style={{
        marginTop: moderateScale(10)
      }}
      horizontal
      keyExtractor={(item, index) => `${item.id}${index}`}
      data={uniqBy(meals.concat(lunches), 'id')}
      renderItem={({ item }: any) => (
        <View>
          <Image
            source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
            style={{
              width: moderateScale(140),
              height: moderateScale(90),
              borderRadius: moderateScale(12)
            }}
          />
          <Text adjustsFontSizeToFit style={{ marginVertical: moderateScale(10), fontSize: moderateScale(13) }}>{item.name}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: moderateScale(6),
          }}
        />
      )}
    />
  )
}
