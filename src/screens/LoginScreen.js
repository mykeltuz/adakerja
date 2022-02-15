import React, {
  useEffect, useState
} from 'react'
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Text,
  View,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, } from 'expo-auth-session';

import {
  AccentColor,
  TextColor1,
  SecondaryAccentColor,
} from '../utils/appTheme'

import SafeAreaView from '../components/SafeAreaView'
import PrimaryButton from '../components/PrimaryButton'
import GitHuBLogo from '../assets/img_icons/github_logo.png'

WebBrowser.maybeCompleteAuthSession();



function LoginScreen (props) {
  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/0bb303a9942779fb1259',
  };
  const authRequestConfig = {
    clientId: '0bb303a9942779fb1259',
    clientSecret: '56083391ce18bba9d41e3b3b680f2c94782b62c6',
    scopes: ['identity'],
    redirectUri: makeRedirectUri({
      scheme: 'AdaKerja'
      }),
    // redirectUri: 'https://auth.expo.io/@mykelsure/AdaKerja',
    // redirectUri: 'exp://localhost:19000/--/*',
    // allow_signup: true,
  }
  console.log('authRequestConfig', authRequestConfig)
  const [request, response, promptAsync] = useAuthRequest(authRequestConfig, discovery);
  // promptAsync({useProxy: true,})

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      }
      console.log('res', response)
  }, [response])
  
  return (
    <SafeAreaView
      barStyle="dark-content" 
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
        <Image 
          source={GitHuBLogo}
          style={{
            height: 80,
            width: 80,
          }}
          resizeMode='contain'
        />
        <Text
          style={{
            color: TextColor1,
            fontSize: 24,
            textAlign: 'center',
            fontWeight: '500',
            marginBottom: 40,
            marginTop: 25,
          }}
        >
          Welcome to AdaKerja Devs
        </Text>        
        <PrimaryButton
          disabled={!request}
          is_loading={!request}
          text="Sign In With GitHub"
          onPress={() =>  promptAsync()}
          containerStyles={{
            marginTop: 40,
          }}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default LoginScreen