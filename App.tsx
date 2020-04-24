import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AsyncStorage, ImageBackground } from 'react-native';
import Onboarding from "./screens/Onboarding";
import { SCREENS } from "./utils";
import { createStackNavigator } from "@react-navigation/stack";
import MainApp from "./MainApp";
import SignIn from "./screens/SignIn";
import UserContext from "./store/UserContext";
import * as UserApi from './api/User';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { AppLoading } from "expo";
import { User } from './types/User';
import { getSocketToken } from "./api/storage";
import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: 'https://d6137643f47c4b0d89f69edf7ad65b96@o244178.ingest.sentry.io/5201546',
  enableInExpoDevelopment: true,
  debug: true,
});

const Stack = createStackNavigator();

const Splash = ({ navigation }) => {
  const { authenticated, showOnboarding, checking } = useContext(UserContext)
  const getInitialRouteName = () => {
    if (authenticated) {
      return SCREENS.MAIN_APP
    }
    if (showOnboarding) {
      return SCREENS.ONBOARDING
    }
    return SCREENS.SIGN_IN
  }
  useEffect(() => {
    if (checking) {
      return
    }
    navigation.replace(getInitialRouteName())
  }, [checking])
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('./assets/splash.png')
      }
    />
  )
}
export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)
  const [checking, setChecking] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [hasStaleData, setHasStaleData] = useState<boolean>(false)
  const [socketToken, setSocketToken] = useState<string | null>(null)
  const OnboardingScreen = () => (
    <Onboarding
      onDone={async () => {
        await AsyncStorage.setItem('passed_onboarding', 'true')
        setShowOnboarding(false)
      }}
    />
  )
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user, token } = await UserApi.getSelf()
        const storedSocketToken = await getSocketToken()
        setUser(user)
        setAuthenticated(true)
        setToken(token)
        console.log('Setting socket token', storedSocketToken)
        setSocketToken(storedSocketToken)
      } catch (e) {
        Sentry.captureException(e)
        if (e.response && e.response.status !== 401) {
          console.error('Error at check auth', e)
        } else {
          console.log('Cannot authenticate', e)
        }
        // noop
      }
    }
    const checkInitialSettings = async () => {
      try {
        const passedOnboarding: null | string = await AsyncStorage.getItem('passed_onboarding')
        if (!passedOnboarding || passedOnboarding !== 'true') {
          setShowOnboarding(true)
        } else {
          await checkAuth()
        }
      } catch (e) {
        Sentry.captureException(e)
        console.error('Error happened', e)
      }
      setChecking(false)
    }
    checkInitialSettings()
  }, [])
  if (checking) {
    return <AppLoading />
  }
  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <UserContext.Provider
        value={{
          user,
          token,
          authenticated,
          refreshing,
          socketToken,
          setUser,
          setToken,
          setAuthenticated,
          setRefreshing,
          setHasStaleData,
          setSocketToken,
          showOnboarding,
          checking,
          hasStaleData,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            backBehavior="history"
            headerMode="none"
            initialRouteName="splash"
          >
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name={SCREENS.ONBOARDING} component={OnboardingScreen} />
            <Stack.Screen name={SCREENS.SIGN_IN} component={SignIn} />
            <Stack.Screen name={SCREENS.MAIN_APP} component={MainApp} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </ApplicationProvider>
  );
}
