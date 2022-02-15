import React from 'react'
import { StatusBar } from 'expo-status-bar';
import SafeAreaView from 'react-native-safe-area-view'
import {
  Image,
  Text,
  View,
} from 'react-native'

import {
  AccentColor,
  SecondaryAccentColor,
} from '../utils/appTheme'

import PrimaryButton from '../components/PrimaryButton'

function WelcomeScreen (props) {
  return (
    <SafeAreaView
    barStyle="light-content" 
      style={{
        flex: 1,
        backgroundColor: SecondaryAccentColor,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: SecondaryAccentColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: AccentColor,
            fontSize: 24,
            textAlign: 'center',
            fontWeight: '500',
            marginBottom: 40,
          }}
        >
          Welcome to
        </Text>
        <PrimaryButton
          is_loading={false}
          disabled={false}
          text={'Get Started'}
          onPress={() => props.navigation.navigate('LoginScreen')}
          containerStyles={{
            marginTop: 40,
          }}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

export default WelcomeScreen