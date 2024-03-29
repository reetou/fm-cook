import { Alert, AsyncStorage, Platform, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import React, { useContext, useEffect, useState } from "react";
import Auth from "../api/Auth";
import { getErrorDetail, SCREENS } from "../utils";
import { CommonActions } from '@react-navigation/native';
import UserContext from "../store/UserContext";
import registerForPushNotificationsAsync from "../registerForPushNotificationsAsync";
import * as Sentry from "sentry-expo";
import { moderateScale } from "react-native-size-matters";

export default function CodeView({ navigation }) {
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    setAuthenticated,
    setToken,
    setSocketToken,
    setUser
  } = useContext(UserContext)
  const submit = async () => {
    setLoading(true)
    try {
      const data = await Auth.sendCode(Number(code))
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('socketToken', data.socket_token)
      await AsyncStorage.setItem('cached_user', JSON.stringify(data.user))
      registerForPushNotificationsAsync()
        .catch(e => Sentry.captureException(e))
      setToken(data.token)
      setAuthenticated(true)
      setUser(data.user)
      setSocketToken(data.socket_token)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {name: SCREENS.MAIN_APP}
          ]
        })
      )
    } catch (e) {
      setCode('')
      Alert.alert(
        'Ошибка',
        getErrorDetail(e),
        [
          {
            text: 'OK', onPress: () => {}
          }
        ],
        { cancelable: false }
      )
    }
    setLoading(false)
  }
  useEffect(() => {
    if (code.length === 4 && !loading) {
      submit()
    }
  }, [code])
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TextInputMask
        autoFocus={Platform.OS === 'ios'}
        secureTextEntry
        editable={code.length < 4}
        caretHidden
        type={'only-numbers'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '9 9 9 9'
        }}
        placeholder="* * * *"
        style={{
          width: '100%',
          textAlign: 'center',
          letterSpacing: 15,
          fontSize: moderateScale(26),
        }}
        maxLength={4}
        value={code}
        onChangeText={text => {
          if (text.length > 4) {
            return
          }
          setCode(text)
        }}
      />
    </View>
  )
}
