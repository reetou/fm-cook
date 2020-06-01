import React, { useContext, useState } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { PRODUCTS_SCREENS } from "../utils";
import { Text, TouchableOpacity } from 'react-native'
import ProductsListView from "../views/ProductsListView";
import AddMealView from "../views/AddMealView";
import AddProductView from "../views/AddProductView";
import AddLunchContext from '../store/AddLunchContext';
import NewAddLunchView from "../views/NewAddLunchView";
import NewSelectMealsView from "../views/NewSelectMealsView";
import { moderateScale } from 'react-native-size-matters';

const Stack = createStackNavigator();

export default function Products({ navigation }) {
  const [lunchName, setLunchName] = useState<string>('')
  const [lunchPrice, setLunchPrice] = useState<string>('')
  const [lunchMeals, setLunchMeals] = useState<any[]>([])
  return (
    <AddLunchContext.Provider
      value={{
        name: lunchName,
        price: lunchPrice,
        meals: lunchMeals,
        setMeals: setLunchMeals,
        setPrice: setLunchPrice,
        setName: setLunchName,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name={PRODUCTS_SCREENS.LIST}
          options={{
            headerRight: ({ tintColor }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(PRODUCTS_SCREENS.ADD_PRODUCT)
                }}
                style={{
                  backgroundColor: tintColor,
                  marginRight: 16
                }}
              >
                <Text style={{ fontSize: moderateScale(14) }}>Добавить</Text>
              </TouchableOpacity>
            ),
            title: 'Блюда и комбо'
          }}
          component={ProductsListView}
        />
        <Stack.Screen
          name={PRODUCTS_SCREENS.ADD_PRODUCT}
          options={{
            title: 'Добавить'
          }}
          component={AddProductView}
        />
        <Stack.Screen name={PRODUCTS_SCREENS.ADD_MEAL} component={AddMealView} />
        <Stack.Screen name={PRODUCTS_SCREENS.ADD_LUNCH} component={NewAddLunchView} />
        <Stack.Screen name={PRODUCTS_SCREENS.SELECT_MEALS} component={NewSelectMealsView} />
      </Stack.Navigator>
    </AddLunchContext.Provider>
  )
}
