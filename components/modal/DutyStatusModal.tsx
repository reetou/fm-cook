import React from 'react'
import { View, Image, Text } from "react-native";
import Modal from "react-native-modal";
import Styleguide from "../../Styleguide";
import ModalHeader from "./ModalHeader";

interface Props {
  onClose: () => void;
  isVisible: boolean;
}

const Bold = ({children}) => (
  <Text style={{ fontWeight: 'bold' }}>{children}</Text>
)

export default function DutyStatusModal(props: Props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onSwipeComplete={props.onClose}
      swipeDirection={["down", "right", "left"]}
      onBackdropPress={props.onClose}
    >
      <View style={{ flex: 1, marginTop: 100 }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: -20,
            marginBottom: -20,
            backgroundColor: Styleguide.primaryBackgroundColor,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}
        >
          <ModalHeader
            onPressClose={props.onClose}
          />
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Image
              source={require('../../assets/cooker.png')}
            />
            <View
              style={{
                marginTop: 20
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Статус активности
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  fontSize: 16
                }}
              >
                Включите статус <Bold>Принимаю заказы</Bold>, чтобы начать работу
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  fontSize: 16
                }}
              >
                <Bold>Будьте готовы</Bold> в любой момент принять заказ
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  fontSize: 16
                }}
              >
                <Bold>Устали?</Bold> Выключите статус и отдохните.
              </Text>
              <Text
                style={{
                  marginTop: 40,
                  textAlign: 'center',
                  marginHorizontal: 30,
                  fontSize: 18
                }}
              >
                Только вы определяете свой режим работы.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
