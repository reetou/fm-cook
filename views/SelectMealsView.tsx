import React, { useContext, useEffect } from 'react'
import { List, ListItem, ButtonGroup, useTheme } from "@ui-kitten/components";
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import UserContext from "../store/UserContext";
import { productItemDescription, PRODUCTS_SCREENS } from "../utils";
import { Ionicons } from '@expo/vector-icons';
import Styleguide from "../Styleguide";
import AddLunchContext from "../store/AddLunchContext";

const styles = StyleSheet.create({
  groupButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
})

export default function SelectMealsView({ navigation, route: { params } }) {
  const theme = useTheme()
  const { user } = useContext(UserContext)
  const {
    setMeals,
    meals,
  } = useContext(AddLunchContext)
  useEffect(() => {
    navigation.setOptions({
      title: 'Блюда'
    })
  }, [])
  const addButtonsDisabled = meals.length >= 5
  const renderItem = ({ item, index }) => (
    <ListItem
      key={item.id}
      titleStyle={{
        fontSize: 18,
        lineHeight: 32
      }}
      icon={() => (
        <Text>
          {
            meals
              .reduce((prev, cur) => {
                if (cur.id === item.id) {
                  return prev + 1
                }
                return prev
              }, 0)
          }
        </Text>
      )}
      title={item.name}
      description={productItemDescription(item, { hideAvailable: true, hidePortions: true })}
      accessory={(style) => (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonGroup appearance='outline'>
            <TouchableOpacity
              style={styles.groupButton}
              onPress={() => {
                const index = meals
                  .map(m => m.id)
                  .indexOf(item.id)
                if (index > -1) {
                  setMeals(meals.filter((_, i) => i !== index))
                }
              }}
            >
              <Ionicons name="ios-remove" size={20} color={theme["color-primary-default"]} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={addButtonsDisabled}
              style={{
                ...styles.groupButton,
                ...addButtonsDisabled ? {
                  backgroundColor: Styleguide.primaryBackgroundColor,
                } : {}
              }}
              onPress={() => {
                setMeals([...meals, item])
              }}
            >
              <Ionicons
                name="ios-add"
                size={20}
                color={addButtonsDisabled ? Styleguide.tintColor : theme["color-primary-default"]}
              />
            </TouchableOpacity>
          </ButtonGroup>

        </View>
      )}
    />
  )
  return (
    <List
      data={user.meals}
      renderItem={renderItem}
      ListFooterComponent={(
        <View
          style={{
            paddingVertical: 15,
            backgroundColor: 'white',
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              backgroundColor: Styleguide.primaryColor,
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: Styleguide.primaryBackgroundColor,
              }}
            >
              Принять
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )
}
