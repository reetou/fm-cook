import { AsyncStorage, RefreshControl, ScrollView, StatusBar, View } from "react-native";
import Styleguide from "../Styleguide";
import { PROFILE_SCREENS, SCREENS, TABS } from "../utils";
import React, { useContext, useState } from "react";
import { Avatar, ListItem } from '@ui-kitten/components';
import UserContext from "../store/UserContext";
import User from "../api/User";

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
      console.error('Cannot get self', e)
    }
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}
      style={{ flex: 1, backgroundColor: Styleguide.primaryBackgroundColor, paddingTop: 10 }}
    >
      <StatusBar barStyle={Styleguide.statusBarContentColor(TABS.PROFILE)} />
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
      <View
        style={{
          marginTop: 30
        }}
      >
        <ListItem
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.EDIT_PROFILE)
          }}
          title="Редактировать профиль"
        />
        <ListItem
          onPress={() => {
            navigation.navigate(PROFILE_SCREENS.SUPPORT_CHAT)
          }}
          title="Задать вопрос поддержке"
        />
        <ListItem
          style={{
            marginTop: 20
          }}
          titleStyle={{
            color: Styleguide.primaryColor
          }}
          onPress={() => {
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('socketToken')
            setAuthenticated(false)
            navigation.navigate(SCREENS.SIGN_IN)
          }}
          title="Выйти"
        />
      </View>
    </ScrollView>
  );
}
