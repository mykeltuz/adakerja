import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native'

import { 
  AccentColor, ScreenBackgroundColor0,
} from '../utils/appTheme'

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const VW = width /375

export default function PrimaryButton (props) {
  return (
    <TouchableOpacity
      style={[{
        width: props.width,
        height: props.height,
        borderRadius: props.height/2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: props.bg,
      },
        {...props.containerStyles}
      ]}
      onPress={() => props.onPress()}
      disabled={props.disabled}
    >
      {
        props.is_loading ? (
          <ActivityIndicator
            color={ScreenBackgroundColor0}
            size='small'
            animating={props.is_loading}
          />
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: (props.text_color || SecondaryAccentColor),
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {props.text}
          </Text>
        )
      }
    </TouchableOpacity>
  )
}

PrimaryButton.defaultProps ={
  onPress: (() => console.log('Primary button pressed')),
  is_loading: false,
  disabled: false,
  text: 'Sumbit',
  width: 335*VW,
  height: 55,
  containerStyles: {},
  text_color: ScreenBackgroundColor0,
  bg: AccentColor,
}