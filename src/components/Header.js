import React from 'react'
import {
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  AntDesign,
} from 'react-native-vector-icons'

import {
  HeaderText1,
  TextColor0,
} from '../utils/appTheme'

export default function Header(props) {  
  if(props.nav_action === 'go_back') {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems:'center',
          // justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={() => props.onPress(props)}
        >
        <AntDesign
          name='arrowleft'
          size={20}
          color={TextColor0}
        />
        </TouchableOpacity>
        <Text
          style={{
            color: HeaderText1,
            fontWeight:'500',
            fontFamily: 'Mabry',
            fontSize: 20,
            marginHorizontal: 15,
            textTransform: 'capitalize',
            flex: 1,
          }}
        >
          {props.title}
        </Text>
        {
          props.leftChildComponent
        }
      </View>
    )
  } else {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems:'center',
          // justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: HeaderText1,
            fontWeight:'500',
            fontFamily: 'Mabry',
            fontSize: 20,
            flex: 1,
          }}
        >
          {props.title}
        </Text>
        {
          props.leftChildComponent
        }
      </View>
    )
  }
}

Header.defaultProps = {
  leftChildComponent: (() => (<></>)),
  onPress: ((props) => props.navigation.goBack()),
  title: '',
  nav_action: 'menu', // 'menu' || 'go_back'
}