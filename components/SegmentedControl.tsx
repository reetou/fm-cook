import React from 'react'
import Styleguide from "../Styleguide";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { moderateScale } from 'react-native-size-matters';

export default function SegmentedControl(props: any) {
  return (
    <SegmentedControlTab
      tabsContainerStyle={{
        backgroundColor: Styleguide.segmentedTabContainerBgColor,
        borderRadius: moderateScale(12),
        padding: moderateScale(4),
      }}
      activeTabStyle={{
        borderRadius: moderateScale(12),
      }}
      activeTabTextStyle={{
        color: Styleguide.segmentedActiveTabTextColor
      }}
      tabStyle={{
        backgroundColor: Styleguide.segmentedTabBgColor,
        paddingVertical: moderateScale(10),
        borderColor: 'transparent'
      }}
      borderRadius={moderateScale(12)}
      tabTextStyle={{
        color: Styleguide.segmentedTabTextColor,
        fontSize: moderateScale(17),
        fontWeight: '600',
      }}
      {...props}
    />
  )
}
