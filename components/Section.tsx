import React, { ReactNode } from 'react'
import { View, Text, Platform } from "react-native";
import Styleguide from "../Styleguide";
import SectionStatus from "./SectionStatus";
import { moderateScale } from 'react-native-size-matters';

interface Props {
  title: string | ReactNode;
  status?: string;
  statusColor?: 'warning' | 'danger' | 'success';
  rightSide?: ReactNode;
  footer?: ReactNode;
  statusWidth?: number;
  style?: any;
  collapsed?: boolean;
}

export default function Section(props: Props) {
  return (
    <View
      style={{
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: Styleguide.sectionBorderColor,
        backgroundColor: Styleguide.primaryBackgroundColor,
        padding: moderateScale(20),
        marginHorizontal: moderateScale(8),
        marginVertical: moderateScale(10),
        ...props.style
      }}
    >
      <View style={{ padding: moderateScale(12) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '60%', paddingRight: moderateScale(10) }}>
            {
              typeof props.title === 'string'
                ? (
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{
                      fontSize: Platform.OS === 'ios' ? moderateScale(24) : 14,
                      letterSpacing: 0.2,
                      marginBottom: moderateScale(5) }}
                  >
                    {props.title}
                  </Text>
                )
                : props.title
            }
            {
              !props.collapsed && props.status
                ? (
                  <SectionStatus
                    text={props.status}
                    type={props.statusColor}
                    width={props.statusWidth}
                  />
                )
                : null
            }
          </View>
          {props.rightSide || null}
        </View>
        {
          !props.collapsed && props.footer
            ? props.footer
            : null
        }
      </View>
    </View>
  )
}
