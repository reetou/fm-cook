import React from 'react'
import { TouchableOpacity, View, Image } from "react-native";
import { moderateScale } from 'react-native-size-matters';

interface Props {
  onPressClose: () => void;
}

export default function ModalHeader(props: Props) {
  return (
    <View
      style={{
        height: moderateScale(40),
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          marginTop: moderateScale(20),
          marginRight: moderateScale(20),
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
              width: moderateScale(30),
              height: moderateScale(30),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
