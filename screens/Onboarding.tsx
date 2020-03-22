import React from 'react';
import { Image, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export interface OnboardingViewProps {
  onDone: () => void;
}

export default function Onboarding(props: OnboardingViewProps) {
  return (
    <AppIntroSlider
      bottomButton
      onDone={props.onDone}
      renderItem={({item, dimensions}) => (
        <LinearGradient
          style={[
            styles.mainContent,
            dimensions,
          ]}
          colors={item.colors}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.1, y: 1 }}
        >
          <Ionicons
            style={{ backgroundColor: 'transparent' }}
            name={item.icon}
            size={200}
            color="white"
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </LinearGradient>
      )}
      slides={[
        {
          key: 'somethun',
          title: 'Сделано для вас',
          text: 'Можно забрать еду самому или заказать доставку',
          icon: 'md-copy',
          colors: ['#63E2FF', '#B066FE'],
        },
        {
          key: 'somethun1',
          title: 'Приемлемая цена',
          text: 'Оплата напрямую и без комиссии - повара продают без наценки',
          icon: 'ios-add',
          colors: ['#A3A1FF', '#3A3897'],
        },
        {
          key: 'somethun2',
          title: 'Безопасно',
          text: 'Тщательно проверяем поваров',
          icon: 'md-done-all',
          colors: ['#29ABE2', '#4F00BC'],
        },
      ]}
    />
  );
}
