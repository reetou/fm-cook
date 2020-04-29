import React from 'react'
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Styleguide from "../../Styleguide";
import ModalHeader from "./ModalHeader";
import ModalContentStatus from "./ModalContentStatus";
import ScaleButton from "../ScaleButton";

interface Props {
  onClose: () => void;
  onStartTrial: () => void;
  onCheckout: () => void;
  isVisible: boolean;
  disabled?: boolean;
  subscription_status: 'active' | 'inactive' | 'trialing' | null;
}

export default function SubscriptionStatusModal(props: Props) {
  const renderContent = () => {
    switch (props.subscription_status) {
      case 'active':
      case 'trialing':
        return (
          <ModalContentStatus
            status="success"
            source={require('../../assets/success.png')}
            header="Подписка активна"
            text="Вы можете принимать заказы!"
          />
        )
      case 'inactive':
        return (
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <ModalContentStatus
              status="danger"
              source={require('../../assets/alert.png')}
              header="Подписка неактивна"
              text="Чтобы принимать заказы, нужно продлить подписку."
              footer={(
                <View
                  style={{
                    marginTop: 16
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      textAlign: 'center'
                    }}
                  >
                    300 рублей в неделю
                  </Text>
                </View>
              )}
            />
            <View
              style={{
                margin: 20
              }}
            >
              <ScaleButton
                disabled={props.disabled}
                onPress={props.onCheckout}
                buttonText="Продлить"
              />
            </View>
          </View>
        )
      default:
        return (
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <ModalContentStatus
              status="warning"
              source={require('../../assets/alert.png')}
              header="Подписка неактивна"
              text="Чтобы принимать заказы, нужно активировать подписку."
            />
            <View
              style={{
                margin: 20
              }}
            >
              <ScaleButton
                disabled={props.disabled}
                onPress={props.onStartTrial}
                buttonText="Попробовать бесплатно"
              />
            </View>
          </View>
        )
    }
  }
  return (
    <Modal
      isVisible={props.isVisible}
      onSwipeComplete={props.onClose}
      swipeDirection={["down", "right", "left"]}
      onBackdropPress={props.onClose}
    >
      <View style={{ flex: 1, marginTop: 150 }}>
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
          <View style={{ padding: 10, flex: 1 }}>
            {renderContent()}
          </View>
        </View>
      </View>
    </Modal>
  )
}
