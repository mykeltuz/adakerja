import React from 'react'
import {
  Dimensions,
  Text,
  View,
} from 'react-native'

import ServerSnoozeIcon from '../assets/svg_icons/ServerSnoozeIcon'
import { TextColor0, TextColor2, ScreenBackgroundColor0 } from '../utils/appTheme'
import PrimaryButton from './PrimaryButton'
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const VW = width /375
const VH = height / 812

const SomethingWentWrong = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <ServerSnoozeIcon />
      <Text
        style={{
          color: TextColor0,
          fontSize: 20,
          textAlign: 'center',
          marginTop: 35,
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          color: TextColor2,
          fontSize: 16,
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        {props.message}
      </Text>
      <PrimaryButton
        is_loading={props.is_reloading}
        disabled={props.is_reloading}
        text='Reload'
        onPress={() => props.onPress()}
        containerStyles={{
          alignSelf: 'center',
          marginTop: 140,
        }}
        text_color={ScreenBackgroundColor0}
      />
    </View>
  )
}

export default SomethingWentWrong

SomethingWentWrong.defaultProps = {
  title: 'Oops... Something went wrong',
  message: `Don't worry our gurus are working on fixing this right away. So you can check back later.`,
  is_reloading: false,
  onPress: (() => console.log('Reload button pressed')),
}