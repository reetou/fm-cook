import {
  Alert,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  Text
} from "react-native";
import Styleguide from "../Styleguide";
import {
  AVAILABLE_SUBSCRIPTION_STATUSES, getErrorDetail,
  PROFILE_SCREENS,
  SCREENS,
  subscribeButtonTitle,
  subscriptionStatusTitle,
  TABS
} from "../utils";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, ListItem, Toggle, CheckBox, Card, CardHeader } from '@ui-kitten/components';
import UserContext from "../store/UserContext";
import User from "../api/User";
import Subscription from "../api/Subscription";
import * as Sentry from "sentry-expo";
import BottomSheet from 'reanimated-bottom-sheet'

const DEFAULT_ICON = require('../assets/icon.png')

export default function ProfileView({ navigation }) {
  const { user, setUser, setAuthenticated } = useContext(UserContext)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const refresh = async () => {
    setRefreshing(true)
    try {
      const data = await User.getSelf()
      setUser(data.user)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get self', e)
    }
    setRefreshing(false)
  }
  const updateOnDuty = async (value: boolean) => {
    setRefreshing(true)
    try {
      const data = await User.updateDutyStatus(value)
      setUser(data.user)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot update on duty status', e)
    }
    setRefreshing(false)
  }
  const startTrial = async () => {
    setRefreshing(true)
    try {
      await Subscription.startTrial()
      await refresh()
    } catch (e) {
      Sentry.captureException(e)
      Alert.alert('Ошибка', getErrorDetail(e))
      if (!e.response) {
        console.error('Cannot start trial', e)
      }
    }
    setRefreshing(false)
  }
  const canSubscribe = !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)
  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}
      style={{ flex: 1, backgroundColor: Styleguide.primaryBackgroundColor }}
    >
      <StatusBar barStyle={Styleguide.statusBarContentColor(TABS.PROFILE)} />
      <View>
        <BottomSheet
          snapPoints={[450, 300, 0]}
          renderContent={() => (
            <View>
              <Text>Header</Text>
            </View>
          )}
          renderHeader={() => (
            <View>
              <Text>Shit</Text>
            </View>
          )}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Avatar
          style={{
            width: 160,
            height: 160
          }}
          size="giant"
          source={user.avatar_url ? { uri: user.avatar_url } : null}
          defaultSource={DEFAULT_ICON}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Card
          status="danger"
          header={() => (
            <CardHeader
              title="Начало работы"
            />
          )}
        >
          <CheckBox
            text="Добавьте блюда"
            checked={user.meals.length > 0}
          />
          <CheckBox
            text="Укажите имя и информацию о себе"
            checked={Boolean(user.name && user.description)}
          />
          <CheckBox
            text="Добавьте адрес"
            checked={Boolean(user.address)}
          />
          <CheckBox
            text="Пройдите сертификацию"
            checked={user.certified}
          />
          {/*<CheckBox*/}
          {/*  text="Укажите режимы работы: самовывоз и/или доставка"*/}
          {/*  checked={user.pickup || user.delivery}*/}
          {/*/>*/}
          <CheckBox
            text="Установите количество доступных порций для блюд"
            checked={
              Boolean(
                user.meals
                  .filter(m => m.available)
                  .map(m => m.portions)
                  .reduce((prev, cur) => {
                    return prev + cur
                  }, 0)
              )
            }
          />
          <CheckBox
            text="Оформите подписку"
            checked={AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)}
          />
          <CheckBox
            text={`Начните принимать заказы`}
            checked={user.on_duty}
          />
        </Card>
      </View>
      <View>
        <View
          style={{
            marginVertical: 30,
            marginLeft: 20,
            alignItems: 'flex-start'
          }}
        >
          <Toggle
            disabled={refreshing || !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)}
            checked={user.on_duty}
            onChange={value => {
              updateOnDuty(value)
            }}
            text={user.on_duty ? 'Я на линии' : 'Я не принимаю заказы'}
            status="success"
          />
        </View>

        <ListItem
          style={{
            backgroundColor: Styleguide .primaryColor,
          }}
          titleStyle={{
            color: Styleguide.primaryBackgroundColor
          }}
          disabled
          title={`Статус подписки: ${subscriptionStatusTitle(user)}`}
        />
        <ListItem
          disabled={refreshing}
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.EDIT_PROFILE)
          }}
          title="Редактировать профиль"
        />
        <ListItem
          disabled={refreshing}
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.ADD_ADDRESS)
          }}
          title={user.address ? 'Изменить адрес' : 'Добавить адрес'}
        />
        <ListItem
          disabled={refreshing}
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.SUPPORT_CHAT)
          }}
          title="Задать вопрос поддержке"
        />
        <ListItem
          disabled={refreshing}
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.TILDA_SHOP)
          }}
          title="Купить контейнеры"
        />
        <ListItem
          disabled={refreshing}
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.LAST_ORDERS)
          }}
          title="История заказов"
        />
        {
          canSubscribe
            ? (
              <ListItem
                disabled={refreshing}
                onPress={() => {
                  if (!user.subscription_status) {
                    startTrial()
                  } else {
                    navigation.navigate(PROFILE_SCREENS.YANDEX_CHECKOUT)
                  }
                }}
                title={subscribeButtonTitle(user.subscription_status)}
              />
            )
            : null
        }
        <ListItem
          disabled={refreshing}
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.YANDEX_CHECKOUT)
          }}
          title={"Занести денег"}
        />
        <ListItem
          disabled={refreshing}
          style={{
            marginTop: 20
          }}
          titleStyle={{
            color: Styleguide.primaryColor
          }}
          onPress={async () => {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('socketToken')
            setAuthenticated(false)
            navigation.navigate(SCREENS.SIGN_IN)
          }}
          title="Выйти"
        />
      </View>
    </ScrollView>
  );
}
