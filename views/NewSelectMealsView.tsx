import React, { useContext, useEffect } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import UserContext from "../store/UserContext";
import AddLunchContext from "../store/AddLunchContext";
import Styleguide from "../Styleguide";
import ScaleButton from "../components/ScaleButton";
import PlusIcon from '../assets/plus_bg.svg'
import MinusIcon from '../assets/minus_bg.svg'
import { localizePortions } from "../utils";
import AlertMessage from "../components/AlertMessage";

const DEFAULT_ICON = require('../assets/icon.png')

export default function NewSelectMealsView({ navigation, route: { params } }) {
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
  const addButtonsDisabled = meals.length >= 6
  const addIconSize = 24
  const avatarSize = 76
  return (
    <FlatList
      data={user.meals}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        addButtonsDisabled
          ? (
            <AlertMessage text="Достигнуто максимальное количество блюд" />
          )
          : null
      )}
      renderItem={({item, index}) => (
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 16,
            padding: 16,
            backgroundColor: Styleguide.primaryBackgroundColor,
            borderColor: Styleguide.orderItemBorderColor,
            borderWidth: 1,
            // shadow https://ethercreative.github.io/react-native-shadow-generator/
            shadowColor: "#BDBDBD",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.37,
            shadowRadius: 2.5,
            elevation: 1.5,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View style={{ marginRight: 12 }}>
                <Image
                  source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
                  defaultSource={DEFAULT_ICON}
                  style={{
                    borderRadius: 16,
                    width: avatarSize,
                    height: avatarSize
                  }}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '500',
                      maxWidth: 160,
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '500'
                    }}
                  >
                    {`${item.price} ₽`}
                  </Text>
                </View>
                <Text>
                  {`${item.portions} ${localizePortions(item.portions)} доступно`}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: 12 }}>
              <TouchableOpacity
                disabled={addButtonsDisabled}
                onPress={() => {
                  setMeals([...meals, item])
                }}
              >
                <PlusIcon
                  width={addIconSize}
                  height={addIconSize}
                />
              </TouchableOpacity>
              <View
                style={{
                  paddingVertical: 6
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    textAlign: 'center',
                    fontWeight: '500'
                  }}
                >
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
              </View>
              <TouchableOpacity
                onPress={() => {
                  const index = meals
                    .map(m => m.id)
                    .indexOf(item.id)
                  if (index > -1) {
                    setMeals(meals.filter((_, i) => i !== index))
                  }
                }}
              >
                <MinusIcon
                  width={addIconSize}
                  height={addIconSize}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={{ padding: 20 }}>
          <ScaleButton
            onPress={() => {
              navigation.goBack()
            }}
            buttonText="Готово"
          />
        </View>
      )}
    />
  )
}
