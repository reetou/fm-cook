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
import { moderateScale } from 'react-native-size-matters';

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
  const addIconSize = moderateScale(24)
  const avatarSize = moderateScale(76)
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
            marginTop: moderateScale(10),
            marginHorizontal: moderateScale(10),
            borderRadius: moderateScale(16),
            padding: moderateScale(16),
            backgroundColor: Styleguide.primaryBackgroundColor,
            borderColor: Styleguide.orderItemBorderColor,
            borderWidth: moderateScale(1),
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
              <View style={{ marginRight: moderateScale(12) }}>
                <Image
                  source={item.image_url ? { uri: item.image_url } : DEFAULT_ICON}
                  defaultSource={DEFAULT_ICON}
                  style={{
                    borderRadius: moderateScale(16),
                    width: avatarSize,
                    height: avatarSize
                  }}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <View>
                  <Text
                    style={{
                      fontSize: moderateScale(17),
                      fontWeight: '500',
                      maxWidth: moderateScale(160),
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(17),
                      fontWeight: '500'
                    }}
                  >
                    {`${item.price} ₽`}
                  </Text>
                </View>
                <Text style={{ fontSize: moderateScale(14) }}>
                  {`${item.portions} ${localizePortions(item.portions)} доступно`}
                </Text>
              </View>
            </View>
            <View style={{ marginLeft: moderateScale(12) }}>
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
                  paddingVertical: moderateScale(6)
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(17),
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
        <View style={{ padding: moderateScale(20) }}>
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
