import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SCREENS, TABS } from "../utils";
import { useNavigation } from '@react-navigation/core';
import FirstOnboardingImage from '../assets/onboarding/onboarding-1.svg'
import SecondOnboardingImage from '../assets/onboarding/onboarding-2.svg'
import ThirdOnboardingImage from '../assets/onboarding/onboarding-3.svg'
import FourthOnboardingImage from '../assets/onboarding/onboarding-4.svg'
import LogoType from '../assets/logotype.svg'
import NextIcon from '../assets/onboarding/next.svg'
import Constants from "expo-constants";
import Styleguide from "../Styleguide";

export interface OnboardingViewProps {
  onDone: () => void;
  navigation: any;
}

const NextButton = () => (
  <View
    style={{
      width: 54,
      height: 54,
      backgroundColor: Styleguide.primaryColor,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <NextIcon width={18} height={18} />
  </View>
)

export default function Onboarding(props: OnboardingViewProps) {
  const navigation = useNavigation()
  return (
    <React.Fragment>
      <StatusBar barStyle={Styleguide.statusBarContentColor(TABS.PROFILE)} />
      <AppIntroSlider
        onDone={async () => {
          await props.onDone()
          navigation.navigate(SCREENS.SIGN_IN)
        }}
        activeDotStyle={{
          backgroundColor: 'black'
        }}
        renderNextButton={NextButton}
        renderDoneButton={NextButton}
        renderItem={({item, dimensions}) => (
          <View
            style={[
              {
                paddingTop: Constants.statusBarHeight,
                flex: 1,
                backgroundColor: '#ffffff',
                justifyContent: 'flex-start'
              },
              dimensions,
            ]}
          >
            <View
              style={{
                marginLeft: 24,
                marginTop: 32,
              }}
            >
              <LogoType />
            </View>
            <View
              style={{
                shadowColor: "#BDBDBD",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.37,
                shadowRadius: 2.5,
                elevation: 1.5,
              }}
            >
              {item.image}
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                adjustsFontSizeToFit
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
        slides={[
          {
            key: '1',
            text: 'Делитесь едой и компенсируйте затраты',
            image: <FirstOnboardingImage />
          },
          {
            key: '2',
            text: 'Добавляйте блюда и назначайте цену',
            image: <SecondOnboardingImage />
          },
          {
            key: '3',
            text: 'Выходите на линию когда удобно и принимайте заказы',
            image: <ThirdOnboardingImage />
          },
          {
            key: '4',
            text: 'Станьте лучшим поваром района',
            image: <FourthOnboardingImage />
          },
        ]}
      />
    </React.Fragment>
  );
}
