import React, { ReactNode } from 'react'
import { StatusColorType } from "../../utils";
import { Image, Text, View } from "react-native";
import Styleguide from "../../Styleguide";

interface Props {
  status: StatusColorType;
  source: any;
  header: string;
  text: string;
  footer?: ReactNode;
}

export default function ModalContentStatus(props: Props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          borderRadius: 60,
          height: 120,
          width: 120,
          backgroundColor: Styleguide.getColorByType(props.status),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={props.source}
          style={{
            width: 72,
            height: 72
          }}
        />
      </View>
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
          {props.header}
        </Text>
        <Text
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            textAlign: 'center',
            fontSize: 16
          }}
        >
          {props.text}
        </Text>
      </View>
      <View>
        {props.footer}
      </View>
    </View>
  )
}
