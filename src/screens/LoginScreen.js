import React, {
  useEffect, useState
} from 'react'
import {connect} from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Text,
  View,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync} from 'expo-auth-session';

import {
  AccentColor,
  TextColor1,
  TextColor0,
  ScreenBackgroundColor0,
  SecondaryAccentColor,
} from '../utils/appTheme'

import SafeAreaView from '../components/SafeAreaView'
import PrimaryButton from '../components/PrimaryButton'

import GitHuBLogo from '../assets/img_icons/github_logo.png'

import {
  saveSecureObject,
} from '../utils/handleStorage'

import {
  logIn,
} from '../../redux/actioncreators'

WebBrowser.maybeCompleteAuthSession();



function LoginScreen (props) {
  const [is_loging_in, setLogingIn] = useState(false)

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/0bb303a9942779fb1259',
  };
  const authRequestConfig = {
    clientId: '0bb303a9942779fb1259',
    clientSecret: '56083391ce18bba9d41e3b3b680f2c94782b62c6',
    scopes: ['user', 'identity', 'gist', 'repo'],
    redirectUri: makeRedirectUri({
      scheme: 'adakerja'
      }),
    // redirectUri: 'https://auth.expo.io/@mykelsure/AdaKerja',
    // redirectUri: 'exp://localhost:19000/--/*',
    // allow_signup: true,
  }
  console.log('authRequestConfig', authRequestConfig)
  const [request, response, promptAsync] = useAuthRequest(authRequestConfig, discovery);  

  useEffect(() => {
    const get_access_token = async () => {
      if (response?.type === 'success') {
        const { code } = response.params;
        const tokenRequestConfig = {
          clientId: '0bb303a9942779fb1259',
          clientSecret: '56083391ce18bba9d41e3b3b680f2c94782b62c6',
          scopes: ['user', 'gist', 'repo'],
          redirectUri: makeRedirectUri({
            scheme: 'adakerja'
            }),
          code,
        }
        const access_token_res = await exchangeCodeAsync(
          tokenRequestConfig,
          discovery
        )
        if(access_token_res.accessToken) {
          saveSecureObject('github_access_token', access_token_res)
          props.logIn()
        }
        setLogingIn(false)
        
        console.log('access_token_res', access_token_res)
      }          
      console.log('res', response)
    }

    get_access_token()
    
  }, [response])

  const _login = () => {
    setLogingIn(true)
    promptAsync()
  }


  
  return (
    <SafeAreaView
      barStyle="dark-content" 
      style={{
        flex: 1,
        backgroundColor: ScreenBackgroundColor0,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: ScreenBackgroundColor0,
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
            color: TextColor0,
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 40,
            marginTop: 25,
          }}
        >
          Welcome to AdaKerja Devs
        </Text>        
        <PrimaryButton
          disabled={is_loging_in}
          is_loading={is_loging_in}
          text="Sign In With GitHub"
          onPress={() =>  _login()}
          containerStyles={{
            marginTop: 40,
          }}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  logIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
