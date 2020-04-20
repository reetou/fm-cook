import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formatThemeStyles } from "../../utils";
import { styled } from "@ui-kitten/components";
import Tags from "./index";
import Styleguide from "../../Styleguide";


class ThemedTags extends React.Component<any, any> {

  static styledComponentName = 'Input';

  render() {
    console.log('this props', this.props)
    return (
      <View>
        <Tags
          {...this.props}
          labelStyle={formatThemeStyles(this.props.themedStyle, 'label')}
          containerStyle={{
            ...this.props.themedStyle,
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          inputStyle={{
            backgroundColor: this.props.themedStyle.backgroundColor,
          }}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
            <View
              key={tag}
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  color: Styleguide.secondaryColor,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
              >
                {tag.slice(0, 1).toUpperCase() + tag.slice(1)}
              </Text>
              <TouchableOpacity
                key={`${tag}-${index}`} onPress={onPress}
              >
                <View
                  style={{
                    padding: 8,
                    backgroundColor: Styleguide.primaryColor,
                    borderRadius: 16
                  }}
                >
                  <Text style={{ color: Styleguide.buttonTextColor }}>Удалить</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    )
  }
}

export default styled(ThemedTags)
