import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SCREENS, TABS } from "../utils";
import { useNavigation } from '@react-navigation/core';
import NextIcon from '../assets/onboarding/next.svg'
import Constants from "expo-constants";
import LottieView from "lottie-react-native";
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

function LottieItem(props: { item_key: number }) {
  const getSource = () => {
    switch (props.item_key) {
      case 1:
        return {
          height: 200,
          autoPlay: true,
          source: require('../assets/lottie/flow.json')
        }
      case 2:
        return {
          height: 200,
          autoPlay: true,
          source: require('../assets/lottie/food_delivered.json')
        }
      default:
        return {
          height: 200,
          autoPlay: true,
          source: require('../assets/lottie/order_created.json')
        }
    }
  }
  return (
    <LottieView
      {...getSource()}
    />
  )
}

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
                justifyContent: 'space-evenly'
              },
              dimensions,
            ]}
          >
            {
              Platform.OS === 'ios'
                ? (
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
                      height: 300,
                      backgroundColor: Styleguide.primaryBackgroundColor,
                      borderRadius: 16,
                      marginHorizontal: 20,
                    }}
                  >
                    {item.image}
                  </View>
                )
                : null
            }
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
            image: <LottieItem item_key={1} />
          },
          {
            key: '2',
            text: 'Договаривайтесь о деталях в чате',
            image: <LottieItem item_key={2} />
          },
          {
            key: '3',
            text: 'Выходите на линию, когда удобно',
            image: <LottieItem item_key={3} />
          },
        ]}
      />
    </React.Fragment>
  );
}
