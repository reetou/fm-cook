import React from 'react'
import { TouchableWithoutFeedback, View } from "react-native";
import { Avatar } from "@ui-kitten/components";
import CameraIcon from "../assets/camera.svg";

const DEFAULT_ICON = require('../assets/icon.png')

interface Props {
  onPress: () => void;
  source: any;
  size: number;
}

export default function EditableAvatar(props: Props) {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
    >
      <View>
        <Avatar
          style={{
            width: props.size,
            height: props.size
          }}
          size="giant"
          source={props.source || DEFAULT_ICON}
          defaultSource={DEFAULT_ICON}
        />
        <View
          style={{
            width: props.size,
            height: props.size,
            backgroundColor: 'gray',
            borderRadius: props.size / 2,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.8
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <CameraIcon width={30} height={30} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
