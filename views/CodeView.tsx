import { Alert, AsyncStorage, Text, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Styleguide from "../Styleguide";
import React, { useContext, useEffect, useRef, useState } from "react";
import Auth from "../api/Auth";
import { SCREENS } from "../utils";
import { CommonActions } from '@react-navigation/native';
import UserContext from "../store/UserContext";
import registerForPushNotificationsAsync from "../registerForPushNotificationsAsync";

export default function CodeView({ navigation }) {
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    setAuthenticated,
    setToken,
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
      setToken(data.token)
      setAuthenticated(true)
      setUser(data.user)
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
        e.message,
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
        autoFocus
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
          fontSize: 26,
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
