import React from 'react'
import { TouchableOpacity, View, Image } from "react-native";
import { Avatar } from "@ui-kitten/components";

const DEFAULT_ICON = require('../assets/icon.png')

interface Props {
  onPress: () => void;
  source: any;
  size: number;
  disabled?: boolean;
}

export default function EditableAvatar(props: Props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
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
            <Image
              style={{
                width: 75 / 2.5,
                height: 57 / 2.5
              }}
              source={require('../assets/camera.png')}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
