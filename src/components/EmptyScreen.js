import React from 'react'
import {
  View
} from 'react-native'

import EmptyContentComp from './EmptyContentComp'
import PrimaryButton from './PrimaryButton'

import ListIcon from '../assets/svg_icons/ListIcon'

export default function EmptyScreen(props) {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
      }}
    >
      <EmptyContentComp 
        icon={props.icon}
        title={props.title}
        message={props.message}
      />
      {
        props.show_primary_button && (
          <PrimaryButton
            text={props.button_text}
            containerStyles={{
              marginTop: 192
            }}
            onPress={props.onPress}
          />
        )
      }
      
    </View>
  )
}

EmptyScreen.defaultProps = {
  icon: ListIcon,
  title: 'Nothing here yet',
  message: `There's nothing to show for now.`,
  button_text: 'Go Back',
  onPress: (() => props.navigation.goBack()),
  show_primary_button: true,
}