import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, View, Text, TouchableOpacity, Alert } from "react-native";
import UserContext from "../store/UserContext";
import User from "../api/User";
import { getErrorDetail, PRODUCTS_SCREENS } from "../utils";
import * as Sentry from "sentry-expo";
import { SwipeListView } from 'react-native-swipe-list-view';
import Styleguide from "../Styleguide";
import Lunch from "../api/Lunch";
import Meal from "../api/Meal";
import ProductItem from "../components/ProductItem";

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
      Sentry.captureException(e)
      // noop
      console.error('Cannot refresh', e)
    }
    setRefreshing(false)
    setHasStaleData(false)
  }
  const deleteItem = async (item: {id: string, meals: any[]}) => {
    setRefreshing(true)
    try {
      if (item.meals) {
        await Lunch.deleteLunch(item.id)
      } else {
        await Meal.deleteMeal(item.id)
      }
      await refresh()
    } catch (e) {
      Sentry.captureException(e)
      // noop
      console.error('Cannot delete item', e)
      Alert.alert('Ошибка', getErrorDetail(e))
    }
    setRefreshing(false)
  }
  useEffect(() => {
    if (hasStaleData) {
      refresh()
    }
  }, [hasStaleData])
  return (
    <SwipeListView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}
      disableRightSwipe={refreshing}
      leftOpenValue={0}
      rightOpenValue={-80}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      renderHiddenItem={({ item }: {item: any}, rowMap) => (
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity
            disabled={refreshing}
            onPress={() => {
              deleteItem(item)
            }}
            style={{
              alignItems: 'center',
              bottom: 0,
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              width: 80,
              backgroundColor: Styleguide.sectionDangerStatusColor,
              right: 0,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: Styleguide.buttonTextColor,
                fontWeight: '500'
              }}
            >
              Удалить
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
      data={user.meals.concat(user.lunches)}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onPress={() => {
            if (item.meals) {
              navigation.navigate(PRODUCTS_SCREENS.ADD_LUNCH, {
                ...item,
                allowEditActivity: true,
                header_title: 'Редактировать'
              })
            } else {
              navigation.navigate(PRODUCTS_SCREENS.ADD_MEAL, {
                ...item,
                header_title: 'Редактировать'
              })
            }
          }}
          disabled={refreshing}
        />
      )}
    />
  )
}
