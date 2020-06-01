import React from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styleguide from "../Styleguide";
import { formatToTimeZone } from "date-fns-timezone";
import * as Localization from "expo-localization";
import NewOrderProductsRow from "./NewOrderProductsRow";
import { getOrderStatusColorType, getOrderStatusTitle, getOrderTypeTitle } from "../utils";
import { hexToRgb } from "../animatedUtils";
import TouchableScale from 'react-native-touchable-scale';
import SectionStatus from "./SectionStatus";
import { moderateScale } from 'react-native-size-matters';

interface Props {
  order: any;
  onPress: () => void;
}

export default function OrderItem(props: Props) {
  const { order, onPress } = props
  const rgb = hexToRgb(Styleguide.getColorByType('warning'))
  return (
    <TouchableScale
      pressInFriction={10}
      pressOutFriction={10}
      onPress={onPress}
      style={{
        borderRadius: moderateScale(16),
        padding: moderateScale(20),
        backgroundColor: Styleguide.primaryBackgroundColor,
        borderColor: Styleguide.orderItemBorderColor,
        borderWidth: 1,
        // shadow https://ethercreative.github.io/react-native-shadow-generator/
        shadowColor: "#BDBDBD",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 2.5,
        elevation: 1.5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{ color: Styleguide.orderItemSlugColor, fontSize: moderateScale(15), width: '60%' }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Заказ {order.slug}
        </Text>
        <SectionStatus text={getOrderStatusTitle(order.status)} type={getOrderStatusColorType(order.status)} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
        <Text
          style={{
            color: Styleguide.orderItemSlugColor,
            fontSize: moderateScale(20),
            height: moderateScale(24),
            fontWeight: 'bold'
          }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {`${order.order_price} ₽`}
        </Text>
        {
          order.cancel_history && order.cancel_history >= 5
            ? (
              <View
                style={{
                  borderRadius: moderateScale(4),
                  backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
                }}
              >
                <Text
                  adjustsFontSizeToFit
                  style={{
                    paddingVertical: moderateScale(4),
                    paddingHorizontal: moderateScale(8),
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: Styleguide.getColorByType('warning'),
                  }}
                >
                  Часто отменяет заказы
                </Text>
              </View>
            )
            : null
        }
      </View>
      <NewOrderProductsRow {...order} />
      <View
        style={{
          height: 1,
          marginHorizontal: moderateScale(-20),
          marginVertical: moderateScale(15),
          backgroundColor: Styleguide.sectionBorderColor
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/clock.png')} style={{ width: moderateScale(16), height: moderateScale(16), marginRight: moderateScale(12) }} />
          <Text style={{ color: Styleguide.orderItemBottomSectionTextColor, fontSize: moderateScale(15), fontWeight: 'bold' }}>
            {formatToTimeZone(order.created_at, 'DD.MM HH:mm', { timeZone: Localization.timezone || 'Europe/Moscow' })}
          </Text>
        </View>
        <View
          style={{
            borderRadius: moderateScale(20),
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(16),
            backgroundColor: Styleguide.orderItemOrderTypeTabBgColor
          }}
        >
          <Text style={{ color: Styleguide.orderItemBottomSectionTextColor, fontSize: moderateScale(15), fontWeight: 'bold' }}>
            {getOrderTypeTitle(order.type)}
          </Text>
        </View>
      </View>
    </TouchableScale>
  )
}
