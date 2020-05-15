import React, { useContext } from 'react'
import { Image, Text, View } from "react-native";
import Styleguide from "../Styleguide";
import ScaleButton from "./ScaleButton";
import CircleButton from "./CircleButton";
import UserContext from "../store/UserContext";
import AnimatedLogo from "./AnimatedLogo";

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
        padding: 20,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Styleguide.tintColor,
        borderBottomWidth: 0,
      }}
    >
      <View>
        <Text style={{ fontSize: 13, textAlign: 'right' }}>Смахните вниз, чтобы закрыть</Text>
        <AnimatedLogo />
        <View style={{ marginTop: 5, marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: '600', marginVertical: 12 }}>Процесс проверки</Text>
          {
            requirements.map((a, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 6
                }}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: '500' }}
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
                        size={20}
                        style={{
                          marginRight: 6
                        }}
                      >
                        <Image
                          source={require('../assets/success.png')}
                          style={{
                            width: 11,
                            height: 11
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
