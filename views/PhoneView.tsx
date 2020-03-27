import { Alert, AsyncStorage, Text, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Styleguide from "../Styleguide";
import React, { useState } from "react";
import Auth from "../api/Auth";

export default function PhoneView({ navigation }) {
  const [phone, setPhone] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const phoneLength = 16
  const disabled = phone.length !== phoneLength || loading
  const submit = async () => {
    setLoading(true)
    try {
      const data = await Auth.sendPhone(phone)
      await AsyncStorage.setItem('token', data.token)
      navigation.navigate('codeSignIn')
    } catch (e) {
      setPhone('')
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
        type={'cel-phone'}
        editable={!loading}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '+7 999 999 99 99'
        }}
        maxLength={phoneLength}
        placeholder="+7 999 999 99 99"
        style={{
          width: '100%',
          textAlign: 'center',
          textShadowOffset: {
            height: 10,
            width: 5,
          },
          letterSpacing: 3,
          fontSize: 26,
          textShadowColor: '#000',
          textShadowRadius: 30,
        }}
        value={phone}
        onChangeText={text => {
          if (text.length > phoneLength) {
            return
          }
          setPhone(text)
        }}
      />
      <TouchableOpacity
        onPress={submit}
        disabled={disabled}
        style={{
          marginTop: 30,
          paddingVertical: 12,
          width: '80%',
          marginHorizontal: 20,
          backgroundColor: disabled ? Styleguide.tintColor : Styleguide.primaryColor,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: Styleguide.primaryBackgroundColor,
          }}
        >
          Отправить
        </Text>
      </TouchableOpacity>
    </View>
  )
}
