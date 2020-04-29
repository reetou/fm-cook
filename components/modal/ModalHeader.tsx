import React from 'react'
import { TouchableOpacity, View, Image } from "react-native";

interface Props {
  onPressClose: () => void;
}

export default function ModalHeader(props: Props) {
  return (
    <View
      style={{
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          marginTop: 20,
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={props.onPressClose}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../../assets/modal/close.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
