import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from "react-native";
import { List, ListItem, Text } from "@ui-kitten/components";
import UserContext from "../store/UserContext";
import User from "../api/User";
import { productItemDescription, PRODUCTS_SCREENS } from "../utils";

export default function ProductsListView({ navigation }) {
  const {
    user,
    refreshing,
    setRefreshing,
    setUser,
    hasStaleData,
    setHasStaleData,
  } = useContext(UserContext)
  const refresh = async () => {
    setRefreshing(true)
    try {
      const data = await User.getSelf()
      setUser(data.user)
    } catch (e) {
      // noop
      console.error('Cannot refresh', e)
    }
    setRefreshing(false)
    setHasStaleData(false)
  }
  useEffect(() => {
    if (hasStaleData) {
      refresh()
    }
  }, [hasStaleData])
  return (
    <List
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}
      data={user.meals.concat(user.lunches)}
      renderItem={({ item }) => (
        <ListItem
          onPress={() => {
            if (item.meals) {
              navigation.push(PRODUCTS_SCREENS.ADD_LUNCH, {
                ...item,
                header_title: 'Редактировать'
              })
            } else {
              navigation.push(PRODUCTS_SCREENS.ADD_MEAL, {
                ...item,
                header_title: 'Редактировать'
              })
            }
          }}
          key={item.id}
          title={`${item.meals ? 'Ланч: ' : ''}${item.name}`}
          description={productItemDescription(item)}
        />
      )}
    />
  )
}
