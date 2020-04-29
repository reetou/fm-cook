import React from 'react'
import { View, Image, Text, ScrollView } from "react-native";
import Modal from "react-native-modal";
import Styleguide from "../../Styleguide";
import ModalHeader from "./ModalHeader";
import SubscriptionFeatureSheet from "../SubscriptionFeatureSheet";

interface Props {
  onClose: () => void;
  isVisible: boolean;
  disabled?: boolean;
  onPress: () => void;
  buttonText: string;
}

export default function SubscriptionFeatureModal(props: Props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onSwipeComplete={props.onClose}
      swipeDirection={["down", "right", "left"]}
      onBackdropPress={props.onClose}
    >
      <View style={{ flex: 1 }}>
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
          <View style={{ paddingTop: 6 }}>
            <SubscriptionFeatureSheet
              buttonText={props.buttonText}
              disabled={props.disabled}
              onPress={props.onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
