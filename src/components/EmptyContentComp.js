import  React from 'react'
import {
  Text,
  View,
} from 'react-native'


import { HeaderText3, TextColor2 } from '../utils/appTheme'

export default class EmptyContentComp extends React.Component {
  render() {
    const Icon = this.props.icon
    return(
      <View
        style={{
          width: '100%',
          alignItems:'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Icon />
        <Text
          style={{
            fontFamily: 'Mabry',
            fontSize: 20,
            color: HeaderText3,
            marginVertical: 15,
            textAlign: 'center',
          }}
        >
          {this.props.title}
        </Text>
        <Text
          style={{
            fontFamily: 'Mabry',
            fontSize: 16,
            color: TextColor2,
            textAlign: 'center',
          }}
        >
          {this.props.message}
        </Text>
      </View>
    )
  }
  
}