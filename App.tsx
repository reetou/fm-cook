import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import OnboardingView from "./views/Onboarding";
import Styleguide from "./Styleguide";
import { TABS } from "./utils";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Styleguide.primaryBackgroundColor }}>
      <StatusBar barStyle={Styleguide.statusBarContentColor(TABS.PROFILE)} />
      <Text>Some info will be here</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Styleguide.primaryBackgroundColor }}>
      <Text style={{ textAlign: 'center' }}>Заказов пока нет. Пройдите сертификацию и все будет.</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)
  useEffect(() => {
    const checkInitialSettings = async () => {
      try {
        const passedOnboarding: null | string = await AsyncStorage.getItem('passed_onboarding')
        if (!passedOnboarding || passedOnboarding !== 'true') {
          setShowOnboarding(true)
        }
      } catch (e) {
        console.error('Error happened', e)
      }
    }
    checkInitialSettings()
  }, [])
  return (
    <React.Fragment>
      {
        showOnboarding
          ? (
            <OnboardingView
              onDone={async () => {
                await AsyncStorage.setItem('passed_onboarding', 'true')
                setShowOnboarding(false)
              }}
            />
          )
          : (
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === TABS.PROFILE) {
                      iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                    } else if (route.name === TABS.ORDERS) {
                      iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: Styleguide.primaryColor,
                  inactiveTintColor: Styleguide.tintColor,
                }}
              >
                <Tab.Screen name={TABS.PROFILE} component={HomeScreen} />
                <Tab.Screen name={TABS.ORDERS} component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          )
      }
    </React.Fragment>
  );
}
