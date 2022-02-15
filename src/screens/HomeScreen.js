import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

import {
  AccentColor,
  TextColor0,
  SecondaryAccentColor0,
} from '../utils/appTheme'

function HomeScreen (props) {
  return (
    <SafeAreaView
      barStyle="dark-content" 
      style={{
        flex: 1,
      }}
    >
    <View
      style={{
        flex: 1,
        backgroundColor: SecondaryAccentColor0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>
        HomeScreen
      </Text>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen