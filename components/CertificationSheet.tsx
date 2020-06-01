import React, { useContext } from 'react'
import { Image, Text, View } from "react-native";
import Styleguide from "../Styleguide";
import ScaleButton from "./ScaleButton";
import CircleButton from "./CircleButton";
import UserContext from "../store/UserContext";
import AnimatedLogo from "./AnimatedLogo";
import { moderateScale, scale } from 'react-native-size-matters';

interface Props {
  onPress: () => void;
  height: number;
  disabled?: boolean;
}

export default function CertificationSheet(props: Props) {
  const { user } = useContext(UserContext)
  const requirements = [
    {
      text: 'Добавьте личные данные',
      completed: Boolean(user.name)
    },
    {
      text: 'Добавьте свое фото',
      completed: Boolean(user.avatar_url)
    },
    {
      text: 'Добавьте адрес',
      completed: Boolean(user.address)
    },
    {
      text: 'Дождитесь нашего звонка',
      completed: false
    },
  ]
  const buttonDisabled = requirements.some(v => !v.completed) || props.disabled || user.certification_pending
  return (
    <View
      style={{
        height: props.height,
        backgroundColor: Styleguide.primaryBackgroundColor,
        padding: moderateScale(20),
        borderTopRightRadius: moderateScale(24),
        borderTopLeftRadius: moderateScale(24),
        justifyContent: 'space-between',
        borderWidth: moderateScale(1),
        borderColor: Styleguide.tintColor,
        borderBottomWidth: 0,
      }}
    >
      <View>
        <Text style={{ fontSize: moderateScale(13), textAlign: 'right' }}>Смахните вниз, чтобы закрыть</Text>
        <AnimatedLogo />
        <View style={{ marginTop: moderateScale(5), marginBottom: moderateScale(12) }}>
          <Text style={{ fontSize: moderateScale(24), fontWeight: '600', marginVertical: moderateScale(12) }}>Процесс проверки</Text>
          {
            requirements.map((a, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: moderateScale(6)
                }}
              >
                <Text
                  style={{ fontSize: moderateScale(17), fontWeight: '500' }}
                  adjustsFontSizeToFit
                >
                  {a.text}
                </Text>
                {
                  a.completed
                    ? (
                      <CircleButton
                        type="success"
                        disabled
                        size={moderateScale(20, 0.2)}
                        style={{
                          marginRight: moderateScale(6)
                        }}
                      >
                        <Image
                          source={require('../assets/success.png')}
                          style={{
                            width: scale(11),
                            height: scale(11)
                          }}
                        />
                      </CircleButton>
                    )
                    : null
                }
              </View>
            ))
          }
        </View>
      </View>
      <ScaleButton
        onPress={props.onPress}
        disabled={buttonDisabled}
        buttonText={user.certification_pending ? 'Заявка в работе' : 'Оставить заявку'}
      />
    </View>
  )
}
