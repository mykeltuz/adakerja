import React from 'react'
import * as Font from 'expo-font'
import {connect} from 'react-redux'
import AppLoading from 'expo-app-loading'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
} from 'react-native'
import { setCustomText } from 'react-native-global-props'

import Loading from './src/components/Loading';

import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import ResultScreen from './src/screens/ResultScreen'

const AuthStack = createStackNavigator()

function AuthStackScreen () {
  return (    
    <AuthStack.Navigator
      screenOptions={{
          headerVisible: false,
          headerShown: false
      }}
    >   
      <AuthStack.Screen  
        name='LoginScreen'
        component={LoginScreen}         
      />      
    </AuthStack.Navigator>    
  )
}

const MainStack = createStackNavigator()

function MainStackScreen () {
  return (    
    <MainStack.Navigator
      screenOptions={{
          headerVisible: false,
          headerShown: false
      }}
    >      
      <MainStack.Screen  
        name='HomeScreen'
        component={HomeScreen}         
      />
      <MainStack.Screen  
        name='ResultScreen'
        component={ResultScreen}         
      />
    </MainStack.Navigator>    
  )
}

class AppNavigator extends React.Component {
  state = {
    is_loading: true,
    err_msg: '',
    loading_failed: false,
  }

  _loadResourcesAsync = async () => {
    await this.loadFonts()      
  }

  loadFonts = async () => {
    await Font.loadAsync({
      // Load a font from a static resource                    
      'Mabry': require('./src/assets/fonts/Mabry-Pro/Mabry.otf'),                                   
      'Mabry-Bold': require('./src/assets/fonts/Mabry-Pro/MabryProMedium.otf'),                       
    })
    const customTextProps = { 
      style: { 
        fontFamily: 'Mabry',
        fontSize: 14,
      }
    }
    setCustomText(customTextProps)
  }

  _handleFinishLoading = () => {    
    this.setState({
      ...this.state,
      is_loading: false,
      loading_failed: false,
    })
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn('loading error - ' + error)
    this.setState({
      ...this.state,
      err_msg: error.message,
      loading_failed: true,
      is_loading: false,
    })
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {
          this.state.is_loading && (
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
            />
          )
        }

        {
          !this.state.is_loading && !this.state.loading_failed && (   
            <NavigationContainer >   
              {
                this.props.current_state === 'authenticate' && (
                  <AuthStackScreen />
                )
              }
              {
                this.props.current_state === 'main-flow' && (
                  <MainStackScreen />
                )
              }
              
            </NavigationContainer>
          )
        }
      </View>
    )
  }
}


const mapStateToProps = state => ({
  current_state: state.navigation_state.current_state,

})

const mapDispatchToProps = {
  // switchTheme,
  // updateDashboardLoadingDisplayType,
  // setDefaultState,
  // pinSignOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)