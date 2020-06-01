import { Alert, AsyncStorage, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Styleguide from "../Styleguide";
import React, { useState } from "react";
import Auth from "../api/Auth";
import { getErrorDetail } from "../utils";
import { moderateScale } from 'react-native-size-matters';

const TextLink = (props: {text: string, onPress: () => void}) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <Text
      style={{
        color: Styleguide.primaryColor,
        fontWeight: '500'
      }}
    >
      {props.text}
    </Text>
  </TouchableWithoutFeedback>
)

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
          fontSize: moderateScale(26),
          ...Platform.OS === 'ios' ? {
            textShadowColor: '#000',
            textShadowRadius: 30,
          } : {},
        }}
        value={phone}
        onChangeText={text => {
          if (text.length > phoneLength) {
            return
          }
          setPhone(text)
        }}
      />
      <View style={{ padding: moderateScale(20) }}>
        <Text style={{ textAlign: 'center', fontSize: moderateScale(14) }}>
          {`Вводя свой номер телефона вы соглашаетесь с нашими `}
          <TextLink
            text="Условиями пользования"
            onPress={() => {
              navigation.push('documents', {
                screen: 'terms'
              })
            }}
          />
          {` и `}
          <TextLink
            text="Политикой конфиденциальности"
            onPress={() => {
              navigation.push('documents', {
                screen: 'privacy_policy'
              })
            }}
          />
        </Text>
      </View>
      <TouchableOpacity
        onPress={submit}
        disabled={disabled}
        style={{
          paddingVertical: moderateScale(12),
          width: '80%',
          marginHorizontal: moderateScale(20),
          backgroundColor: disabled ? Styleguide.tintColor : Styleguide.primaryColor,
          borderRadius: moderateScale(20),
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: Styleguide.primaryBackgroundColor,
            fontSize: moderateScale(14)
          }}
        >
          Отправить
        </Text>
      </TouchableOpacity>
    </View>
  )
}
