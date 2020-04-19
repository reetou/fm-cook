import React from 'react'
import Styleguide from "../Styleguide";
import SegmentedControlTab from "react-native-segmented-control-tab";

export default function SegmentedControl(props: any) {
  return (
    <SegmentedControlTab
      tabsContainerStyle={{
        backgroundColor: Styleguide.segmentedTabContainerBgColor,
        borderRadius: 12,
        padding: 4,
      }}
      activeTabStyle={{
        borderRadius: 12,
      }}
      activeTabTextStyle={{
        color: Styleguide.segmentedActiveTabTextColor
      }}
      tabStyle={{
        backgroundColor: Styleguide.segmentedTabBgColor,
        paddingVertical: 10,
        borderColor: 'transparent'
      }}
      borderRadius={12}
      tabTextStyle={{
        color: Styleguide.segmentedTabTextColor,
        fontSize: 17,
        fontWeight: '600',
      }}
      {...props}
    />
  )
}
