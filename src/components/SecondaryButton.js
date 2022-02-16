import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native'

import { 
  SecondaryButtonColor, HeaderText3, 
} from '../utils/appTheme'

export default function SecondaryButton (props) {
  return (
    <TouchableOpacity
      style={[{
        width: props.width,
        height: props.height,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: SecondaryButtonColor,
      },
        {...props.containerStyles}
      ]}
      onPress={() => props.onPress()}
    >
      {
        props.is_loading ? (
          <ActivityIndicator
            color={HeaderText3}
            size='small'
            animating={props.is_loading}
          />
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: HeaderText3,
              paddingHorizontal: 10,
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

SecondaryButton.defaultProps ={
  onPress: (() => console.log('Secondary button pressed')),
  is_loading: false,
  text: 'Sumbit',
  containerStyles: {},
  width: 204,
  height: 45,
}