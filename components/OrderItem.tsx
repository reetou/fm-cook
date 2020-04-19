import React from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styleguide from "../Styleguide";
import { formatToTimeZone } from "date-fns-timezone";
import * as Localization from "expo-localization";
import NewOrderProductsRow from "./NewOrderProductsRow";
import { getOrderTypeTitle } from "../utils";
import { hexToRgb } from "../animatedUtils";
import TouchableScale from 'react-native-touchable-scale';

interface Props {
  order: any;
  onPress: () => void;
}

export default function OrderItem(props: Props) {
  const { order, onPress } = props
  const rgb = hexToRgb(Styleguide.getColorByType('warning'))
  return (
    <TouchableScale
      onPress={onPress}
      style={{
        borderRadius: 16,
        padding: 20,
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
          style={{ color: Styleguide.orderItemSlugColor, fontSize: 15, width: '60%' }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Заказ {order.slug}
        </Text>
        <Text
          style={{ color: Styleguide.orderItemDateColor, fontSize: 15, width: '30%' }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {formatToTimeZone(order.created_at, 'DD.MM HH:mm', { timeZone: Localization.timezone || 'Europe/Moscow' })}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
        <Text
          style={{
            color: Styleguide.orderItemSlugColor,
            fontSize: 20,
            height: 24,
            fontWeight: 'bold'
          }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {`${order.order_price} ₽`}
        </Text>
        <View
          style={{
            borderRadius: 4,
            backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
          }}
        >
          <Text
            adjustsFontSizeToFit
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              color: Styleguide.getColorByType('warning'),
            }}
          >
            Часто отменяет заказы
          </Text>
        </View>
      </View>
      <NewOrderProductsRow {...order} />
      <View
        style={{
          height: 1,
          marginHorizontal: -20,
          marginVertical: 15,
          backgroundColor: Styleguide.sectionBorderColor
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/clock.png')} style={{ width: 16, height: 16, marginRight: 12 }} />
          <Text style={{ color: Styleguide.orderItemBottomSectionTextColor, fontSize: 15, fontWeight: 'bold' }}>
            {formatToTimeZone(order.created_at, 'HH:mm', { timeZone: Localization.timezone || 'Europe/Moscow' })}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: Styleguide.orderItemOrderTypeTabBgColor
          }}
        >
          <Text style={{ color: Styleguide.orderItemBottomSectionTextColor, fontSize: 15, fontWeight: 'bold' }}>
            {getOrderTypeTitle(order.type)}
          </Text>
        </View>
      </View>
    </TouchableScale>
  )
}
