import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import Styleguide from "../Styleguide";
import { TABS } from "../utils";
import React, { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import { Avatar, Card, CardHeader, CheckBox, Input, Text, Toggle } from '@ui-kitten/components';

export default function Profile() {
  const { user } = useContext(UserContext)
  const [name, setName] = useState<string>(user.name || '')
  const [pickup, setPickup] = useState<boolean>(Boolean(user.pickup))
  const [delivery, setDelivery] = useState<boolean>(Boolean(user.pickup))
  const [description, setDescription] = useState<string>('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Styleguide.primaryBackgroundColor }}>
        <StatusBar barStyle={Styleguide.statusBarContentColor(TABS.PROFILE)} />
        <ScrollView
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Avatar
              style={{
                width: 160,
                height: 160
              }}
              size="giant"
              source={require('../assets/icon.png')}
            />
            <Card
              status="danger"
              style={{
                marginVertical: 20,
              }}
              header={() => (
                <CardHeader
                  title="Начало работы"
                />
              )}
            >
              <CheckBox
                text="Добавьте блюда"
                checked={user.meals.length > 0}
              />
              <CheckBox
                text="Укажите имя и информацию о себе"
                checked={Boolean(user.name && user.description)}
              />
              <CheckBox
                text="Пройдите сертификацию"
                checked={user.certified}
              />
              <CheckBox
                text="Укажите режимы работы: Самовывоз или доставка"
                checked={user.pickup || user.delivery}
              />
              <CheckBox
                text="Установите количество доступных порций для блюд"
                checked={
                  Boolean(
                    user.meals
                      .filter(m => m.available)
                      .map(m => m.portions)
                      .reduce((prev, cur) => {
                        return prev + cur
                      }, 0)
                  )
                }
              />
              <CheckBox
                text={`Нажмите кнопку "Принимаю заказы"`}
                checked={user.on_duty}
              />
            </Card>
          </View>
          <Input
            label="Имя"
            placeholder="Имя будет видно всем клиентам"
            value={name}
            onChangeText={setName}
            maxLength={128}
          />
          <Input
            label="О себе"
            placeholder="Расскажите о себе"
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={1024}
          />
          <View
            style={{
              alignItems: 'flex-start',
            }}
          >
            <Toggle
              style={{
                marginTop: 10,
              }}
              checked={pickup}
              onChange={setPickup}
              text="Самовывоз для клиентов"
              status="success"
            />
            <Toggle
              style={{
                marginTop: 10,
              }}
              checked={delivery}
              onChange={setDelivery}
              text="Я работаю с доставкой"
              status="warning"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
