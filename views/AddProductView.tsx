import React from 'react'
import { List, ListItem } from "@ui-kitten/components";
import { PRODUCTS_SCREENS } from "../utils";

export default function AddProductView({ navigation }) {
  return (
    <List
      data={[
        {
          title: 'Новое блюдо',
          screen: PRODUCTS_SCREENS.ADD_MEAL,
          params: {
            name: '',
            calories: '',
            weight: '',
            price: ''
          }
        },
        {
          title: 'Новое комбо',
          screen: PRODUCTS_SCREENS.ADD_LUNCH,
          params: {
            name: '',
            price: '',
            meals: [],
          }
        },
      ]}
      renderItem={({ item, index }) => (
        <ListItem
          key={index}
          titleStyle={{
            fontSize: 18,
            lineHeight: 32
          }}
          title={item.title}
          onPress={() => {
            navigation.navigate(item.screen, item.params || {})
          }}
        />
      )}
    />
  )
}
