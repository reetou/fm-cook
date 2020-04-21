import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  Text,
  View
} from "react-native";
import Styleguide from "../Styleguide";
import {
  AVAILABLE_SUBSCRIPTION_STATUSES, certificationStatusColorName, certificationStatusTitle, getErrorDetail,
  PROFILE_SCREENS,
  subscriptionStatusColorName,
  subscriptionStatusTitle,
  TABS,
  getSubscribeButtonText
} from "../utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../store/UserContext";
import User from "../api/User";
import Subscription from "../api/Subscription";
import * as Sentry from "sentry-expo";
import Section from "../components/Section";
import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import SwitchButton from "../components/SwitchButton";
import ListItemButton from "../components/ListItemButton";
import SubscriptionSectionFooter from "../components/SubscriptionSectionFooter";
import DutyStatus from "../components/DutyStatus";
import AlertMessage from "../components/AlertMessage";
import * as Updates from "expo-updates";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from 'react-native-reanimated'
import SubscriptionFeatureSheet from "../components/SubscriptionFeatureSheet";
import CertificationSheet from "../components/CertificationSheet";
import Certification from "../api/Certification";

export default function NewProfileView({ navigation }) {
  const { user, setUser, setAuthenticated } = useContext(UserContext)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [hasUpdates, setHasUpdates] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [fall, setFall] = useState<any>(new Animated.Value(1))
  const checkUpdates = async () => {
    if (process.env.NODE_ENV !== 'production') return
    try {
      const data = await Updates.checkForUpdateAsync()
      if (data.isAvailable) {
        setHasUpdates(true)
      }
    } catch (e) {
      console.error('Error happened at check updates', e)
      Sentry.captureException(e)
    }
  }
  const refresh = async () => {
    setRefreshing(true)
    try {
      const data = await User.getSelf()
      setUser(data.user)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot get self', e)
    }
    setRefreshing(false)
  }
  const updateOnDuty = async (value: boolean) => {
    setRefreshing(true)
    try {
      const data = await User.updateDutyStatus(value)
      setUser(data.user)
    } catch (e) {
      Sentry.captureException(e)
      console.error('Cannot update on duty status', e)
    }
    setRefreshing(false)
  }
  const startTrial = async () => {
    setRefreshing(true)
    try {
      await Subscription.startTrial()
      await refresh()
    } catch (e) {
      Sentry.captureException(e)
      Alert.alert('Ошибка', getErrorDetail(e))
      if (!e.response) {
        console.error('Cannot start trial', e)
      }
    }
    setRefreshing(false)
  }
  const sendCertificationRequest = async () => {
    setRefreshing(true)
    try {
      await Certification.requestCertification()
      await refresh()
    } catch (e) {
      Sentry.captureException(e)
      Alert.alert('Ошибка', getErrorDetail(e))
      if (!e.response) {
        console.error('Cannot sendCertificationRequest', e)
      }
    }
    setRefreshing(false)
  }
  const canSubscribe = !AVAILABLE_SUBSCRIPTION_STATUSES.includes(user.subscription_status)
  const canStartTrial = user.subscription_status === null
  const ref = useRef(null)
  const certificationModalRef = useRef(null)
  useEffect(() => {
    checkUpdates()
  }, [])
  const subscriptionFeatureSheetHeight = 500
  const subscriptionButtonText = getSubscribeButtonText(user.subscription_status as any)
  const certificationModalHeight = 450
  const handleSubscribe = () => {
    if (!user.subscription_status) {
      startTrial()
    } else {
      navigation.navigate(PROFILE_SCREENS.YANDEX_CHECKOUT)
    }
  }
  const subscribeButtonDisabled = refreshing || (user.subscription_status && user.subscription_status !== 'inactive')
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Styleguide.primaryBackgroundColor,
      }}
    >
      <BottomSheet
        ref={ref}
        snapPoints={[subscriptionFeatureSheetHeight, 0]}
        borderRadius={12}
        renderContent={() => (
          <SubscriptionFeatureSheet
            height={subscriptionFeatureSheetHeight}
            buttonText={subscriptionButtonText}
            disabled={subscribeButtonDisabled}
            onPress={handleSubscribe}
          />
        )}
        initialSnap={1}
        callbackNode={fall}
        enabledInnerScrolling={false}
      />
      <BottomSheet
        ref={certificationModalRef}
        snapPoints={[certificationModalHeight, 0]}
        borderRadius={12}
        renderContent={() => (
          <CertificationSheet
            disabled={refreshing}
            onPress={sendCertificationRequest}
            height={certificationModalHeight}
          />
        )}
        initialSnap={1}
        callbackNode={fall}
        enabledInnerScrolling={false}
      />
      <StatusBar barStyle={Styleguide.statusBarContentColor(TABS.PROFILE)} />
      <Animated.View
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1))
        }}
      >
        <FlatList
          keyExtractor={(item) => item.label}
          refreshing={refreshing}
          onRefresh={refresh}
          ListHeaderComponent={() => (
            <React.Fragment>
              {
                !user.on_duty ? <AlertMessage text="Внимание! Ваш аккаунт неактивен" /> : null
              }
              <Section
                title="Статус подписки"
                status={subscriptionStatusTitle(user)}
                statusColor={subscriptionStatusColorName(user)}
                statusWidth={180}
                rightSide={(
                  <View>
                    <CircleButton type="info" margin={-20}>
                      <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Styleguide.buttonTextColor }}>?</Text>
                    </CircleButton>
                  </View>
                )}
                footer={(
                  canSubscribe
                    ? (
                      <SubscriptionSectionFooter
                        disabled={subscribeButtonDisabled}
                        onPress={() => {
                          if (!ref && !ref.current) {
                            return
                          }
                          ref.current.snapTo(0)
                        }}
                        text={subscriptionButtonText}
                      />
                    )
                    : null
                )}
              />
              <Section
                title="Сертификация"
                status={certificationStatusTitle(user)}
                statusColor={certificationStatusColorName(user)}
                rightSide={(
                  <View style={{ justifyContent: 'center' }}>
                    {
                      user.certified
                        ? (
                          <CircleButton type="success" disabled margin={-20}>
                            <Image
                              source={require('../assets/success.png')}
                              style={{
                                width: 16,
                                height: 16
                              }}
                            />
                          </CircleButton>
                        )
                        : (
                          <Button
                            onPress={() => {
                              certificationModalRef.current.snapTo(0)
                            }}
                            text="Пройти"
                          />
                        )
                    }
                  </View>
                )}
              />
              <Section
                title={(
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Статус активности</Text>
                    <DutyStatus active={user.on_duty} />
                  </View>
                )}
                rightSide={(
                  <View>
                    <CircleButton type="info" margin={-20}>
                      <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Styleguide.buttonTextColor }}>?</Text>
                    </CircleButton>
                  </View>
                )}
                footer={(
                  <View style={{ marginTop: 20 }}>
                    <SwitchButton
                      disabled={refreshing}
                      value={refreshing ? !user.on_duty : user.on_duty}
                      onValueChange={v => {
                        updateOnDuty(v)
                      }}
                      label="Принимаю заказы"
                    />
                  </View>
                )}
              />
            </React.Fragment>
          )}
          data={[
            {
              icon: require('../assets/profile.png'),
              label: 'Личные данные',
              completed: Boolean(user.name),
              button: (
                <ListItemButton
                  onPress={() => {
                    navigation.navigate(PROFILE_SCREENS.EDIT_PROFILE)
                  }}
                  text={user.name ? 'Изменить' : 'Добавить'}
                />
              )
            },
            {
              icon: require('../assets/home.png'),
              label: 'Адрес',
              completed: Boolean(user.address),
              button: (
                <ListItemButton
                  onPress={() => {
                    navigation.navigate(PROFILE_SCREENS.ADD_ADDRESS)
                  }}
                  text={user.address ? 'Изменить' : 'Добавить'}
                />
              )
            },
            {
              icon: require('../assets/heart.png'),
              label: 'Поддержка',
              button: (
                <ListItemButton
                  onPress={() => {
                    navigation.navigate(PROFILE_SCREENS.SUPPORT_CHAT)
                  }}
                  text="Написать"
                />
              )
            },
            {
              icon: require('../assets/containers.png'),
              label: 'Контейнеры',
              button: (
                <ListItemButton
                  onPress={() => {
                    navigation.navigate(PROFILE_SCREENS.TILDA_SHOP)
                  }}
                  text="Купить"
                />
              )
            },
            {
              icon: require('../assets/profile.png'),
              label: 'Доступно обновление',
              hide: !hasUpdates,
              button: (
                <ListItemButton
                  disabled={updating}
                  onPress={async () => {
                    setUpdating(true)
                    try {
                      const data = await Updates.fetchUpdateAsync()
                      if (data.isNew) {
                        await Updates.reloadAsync()
                      }
                    } catch (e) {
                      console.error('Could not fetch updates', e)
                      Sentry.captureException(e)
                    }
                    setUpdating(false)
                  }}
                  text="Обновить"
                />
              )
            }
          ]}
          renderItem={({item, index}) => {
            if (item.hide) return
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <View>
                      {
                        item.icon
                          ? (
                            <Image
                              source={item.icon}
                              style={{
                                width: 24,
                                height: 24,
                              }}
                              width={24}
                              height={24}
                            />
                          )
                          : null
                      }
                    </View>
                    <Text style={{ paddingLeft: 16, paddingRight: 8 }}>{item.label}</Text>
                    {
                      item.completed
                        ? (
                          <CircleButton type="success" disabled size={20}>
                            <Image
                              source={require('../assets/success.png')}
                              style={{
                                width: 12,
                                height: 12
                              }}
                            />
                          </CircleButton>
                        )
                        : null
                    }
                  </View>
                  {item.button || null}
                </View>
              </View>
            )
          }}
        />
      </Animated.View>
    </View>
  )
}
