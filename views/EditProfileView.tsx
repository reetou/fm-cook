import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View
} from "react-native";
import Styleguide from "../Styleguide";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";
import { Avatar, Input, Toggle } from '@ui-kitten/components';
import * as ImagePicker from "expo-image-picker";
import User from "../api/User";
import * as Sentry from "sentry-expo";
import EditableAvatar from "../components/EditableAvatar";

const DEFAULT_ICON = require('../assets/icon.png')

export default function EditProfileView({ navigation }) {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState<string>(user.name || '')
  const [pickup, setPickup] = useState<boolean>(Boolean(user.pickup))
  const [delivery, setDelivery] = useState<boolean>(Boolean(user.pickup))
  const [description, setDescription] = useState<string>(user.description || '')
  const [avatar, setAvatar] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const setUserFields = (data: any) => {
    setName(data.name)
    setDelivery(data.delivery)
    setPickup(data.pickup)
    setDescription(data.description)
  }
  const refresh = async () => {
    setRefreshing(true)
    try {
      const data = await User.getSelf()
      setUser(data.user)
      setUserFields(data.user)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get self', e)
    }
    setRefreshing(false)
  }

  const pickAvatar = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Ошибка', 'Не получено разрешение на доступ к галерее')
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 0.20,
      allowsEditing: true
    });
    if (pickerResult.cancelled) {
      setAvatar(null)
    } else {
      setAvatar(pickerResult)
    }
  }
  const updateAvatar = async () => {
    if (!avatar) return
    setLoading(true)
    try {
      const data = await User.uploadAvatar(avatar.uri)
      setUser(data.user)
      setUserFields(data.user)
      setAvatar(null)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot update avatar', e)
    }
    setLoading(false)
  }
  const submit = async () => {
    setLoading(true)
    try {
      let meal
      const userData = {
        name,
        pickup,
        delivery,
        description
      }
      const data = await User.updateSelf(userData)
      setUser(data.user)
      setUserFields(data.user)
      Vibration.vibrate(300)
      navigation.popToTop()
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot submit profile', e)
    }
    setLoading(false)
  }
  useEffect(() => {
    updateAvatar()
  }, [avatar])
  useEffect(() => {
    if (refreshing) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [refreshing])
  const avatarSize = 160
  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      )}
      style={{
        paddingHorizontal: 10,
      }}
    >
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <EditableAvatar
          onPress={pickAvatar}
          size={avatarSize}
          source={
            avatar || user ? (
              user.avatar_url ? { uri: user.avatar_url } : DEFAULT_ICON
            ) : DEFAULT_ICON
          }
        />
      </View>
      <Input
        label="Имя"
        placeholder="Имя будет видно всем клиентам"
        value={name}
        onChangeText={setName}
        maxLength={128}
      />
      <Input
        label="О себе"
        placeholder="Расскажите о себе"
        value={description}
        onChangeText={setDescription}
        multiline
        maxLength={1024}
      />
      <View
        style={{
          alignItems: 'flex-start',
        }}
      >
        {/*<Toggle*/}
        {/*  disabled={loading}*/}
        {/*  style={{*/}
        {/*    marginTop: 10,*/}
        {/*  }}*/}
        {/*  checked={pickup}*/}
        {/*  onChange={setPickup}*/}
        {/*  text="Самовывоз для клиентов"*/}
        {/*  status="success"*/}
        {/*/>*/}
        {/*<Toggle*/}
        {/*  disabled={loading}*/}
        {/*  style={{*/}
        {/*    marginTop: 10,*/}
        {/*  }}*/}
        {/*  checked={delivery}*/}
        {/*  onChange={setDelivery}*/}
        {/*  text="Я работаю с доставкой"*/}
        {/*  status="warning"*/}
        {/*/>*/}
      </View>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          disabled={loading}
          style={{
            marginTop: 30,
            paddingVertical: 12,
            marginHorizontal: 20,
            backgroundColor: loading ? Styleguide.tintColor : Styleguide.primaryColor,
            borderRadius: 20,
          }}
          onPress={submit}
        >
          <Text
            style={{
              textAlign: 'center',
              color: Styleguide.primaryBackgroundColor,
            }}
          >
            Обновить
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
