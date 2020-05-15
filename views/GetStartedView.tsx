import React from 'react'
import { Platform, Text, View } from "react-native";
import Constants from 'expo-constants'
import Styleguide from "../Styleguide";
import ModalHeader from "../components/modal/ModalHeader";
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedLogo from "../components/AnimatedLogo";

const Title = (props) => (
  <Text style={{ fontSize: 18, marginTop: 8 }} {...props} />
)

const Description = (props) => (
  <Text style={{ fontSize: 15, marginTop: 8, fontWeight: props.bold ? '500' : 'normal' }} {...props} />
)

export default function GetStartedView() {
  const navigation = useNavigation()
  return (
    <View
      style={{
        backgroundColor: Styleguide.primaryBackgroundColor,
        paddingTop: Constants.statusBarHeight,
        flex: 1,
      }}
    >
      <ModalHeader
        onPressClose={() => {
          navigation.goBack()
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {
            Platform.OS === 'ios'
              ? (
                <View
                  style={{
                    height: 200,
                  }}
                >
                  <LottieView
                    source={require('../assets/lottie/flow.json')}
                    autoPlay
                  />
                </View>
              )
              : (
                <View style={{ marginBottom: 20 }}>
                  <AnimatedLogo />
                </View>
              )
          }
          <Text
            style={{
              fontWeight: '500',
              fontSize: 24,
            }}
          >
            Буханка
          </Text>
          <Description>
            Сервис, который позволяет разделить часть расходов на продукты между поваром и покупателями.
          </Description>
          <Description>
            Вы добавляете блюда, указываете количество порций, которое можете приготовить, и выходите на линию.
          </Description>
          <Title>Процесс работы</Title>
          <Description>
            Заказ приходит в приложение. Принять заказ в работу или нет - решать вам.
          </Description>
          <Description>
            {`Рекомендуем купить красивые контейнеры, в которых вы будете передавать еду, потому что `}
            <Description bold>{`покупатель забирает у вас еду самостоятельно.`}</Description>
          </Description>
          <Title>Оплата</Title>
          <Description>
            {`Покупатель расплачивается с вами напрямую. О предпочтительном методе оплате и другом можно договориться в чате после принятия заказа`}
          </Description>
          <Title>Ограничения</Title>
          <Description>
            {`Мы не ставим ограничений в количестве заказов и не берем никаких комиссий. От вас требуется только оплачивать еженедельную подписку, когда вы работаете.`}
          </Description>
          <Description>
            {`Если вы будете следить за тем, в чем передаете заказ, и хорошо общаться с покупателями, проблем не возникнет.`}
          </Description>
          <Title>Можно ли не платить за ту неделю, когда я не работаю?</Title>
          <Description>
            {`Вы можете заранее составить свой график работы и не оплачивать подписку за ту неделю, когда вы не планируете принимать заказы.`}
          </Description>
          <Title>С чего начать прямо сейчас?</Title>
          <Description>
            {`С сертификации. Заполните личные данные, добавьте блюда и оставьте заявку на сертификацию на главной. Мы очень скоро свяжемся с вами и расскажем о дальнейших шагах`}
          </Description>
        </View>
      </ScrollView>
    </View>
  )
}
