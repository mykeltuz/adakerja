import React from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  View,
  Text,  
  Pressable,
} from 'react-native'
import { Audio } from 'expo-av'

// app theme colors
import {
  ScreenBackgroundColor0,
  CardColor0,
  TextColor0,
} from '../utils/appTheme'


import NotificationBell from '../assets/svg_icons/NotificationBell'
import ErrorIcon from '../assets/svg_icons/ErrorIcon2'
import SuccessIcon from '../assets/svg_icons/SuccessIcon copy'
import WarningIcon from '../assets/svg_icons/WarningIcon'

const width = Dimensions.get("screen").width
const height = Dimensions.get("window").height

const VW = width / 375
const VH = height / 812


const Message = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 10,        
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: ScreenBackgroundColor0,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10
        }}
      >
        {
          props.msg_type === 'default' ? (
            <NotificationBell size={40} />
          ) :null
        }
        {
          props.msg_type === 'error' ? (
            <ErrorIcon size={40} />
          ) :null
        }
        {
          props.msg_type === 'success' ? (
            <SuccessIcon size={40} />
          ) :null
        }
        {
          props.msg_type === 'warning' ? (
            <WarningIcon size={35} />
          ) :null
        }
        
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Mabry',
              color: TextColor0,
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {props.message}
          </Text>
          {/* <Text
            style={{
              // fontFamily: 'Poppins-Light',
              fontSize: 10,
              color: TextColor3,
            }}
            numberOfLines={1}
          >
            1m ago
          </Text> */}
        </View>        
        <Text
          style={{
            // fontFamily: 'Poppins',
            fontSize: 14,
            color: TextColor0,
            marginTop: 6,
          }}
          // adjustsFontSizeToFit
          // numberOfLines={2}
        >
          {props.description}
        </Text>
      </View>
    </View>
  )
}

export default class NotificationPanel extends React.Component {

  state = {
    panel_value: new Animated.ValueXY({x: 0, y: -150}),

    message: '',
    description: '',
    msg_type: 'default', // default, success, warning, danger,  notification,
    notification_sound: null,
  }

  // async componentDidMount() {
      
  // }

  async unloadSound() {
    await this.sound.stopAsync()
    await this.sound.unloadAsync()
  }

  async _showMessage(message, description, type = 'default') {
    this.setState({
      ...this.state,
      message: message,
      description: description,
      msg_type: type,
    })
    // const { sound } = await Audio.Sound.createAsync(
    //   require('../../assets/audio/notification.mpeg')
    // )
    // await sound.playAsync()
    
    Audio.setAudioModeAsync({            
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    })

    this.sound = new Audio.Sound();
    try {
      await this.sound.loadAsync(require('../assets/audio/notification.mp3'));
      await this.sound.playAsync();
      this._open_panel()
      
    } catch (error) {
      console.log('sound error', error)
      this._open_panel()
    }
  }

  _open_panel = async () => {
    // StatusBar.setHidden(true)
    Animated.timing(this.state.panel_value, {
      toValue: {x: 0, y: 40},
      duration: 100, 
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start()
    
    setTimeout(this._close_panel, 10000)
    
  }

  _close_panel = async () => {    
    await this.unloadSound()
    Animated.timing(this.state.panel_value, {
      toValue: {x: 0, y:-150},
      duration: 100, 
      useNativeDriver: true,
      easing: Easing.ease,
    }).start()
    
    // StatusBar.setHidden(false)
  }

  getBorderColor = type => {
    switch (type) {
      case 'success':
        return '#03C071'
      case 'warning':
        return 'orange'
      case 'error':
        return '#F80101'
    
      default:
        return '#e8e8e8'
    }
  }

  render() {
    const panel_content_visibility = this.state.panel_value.y.interpolate({
      inputRange: [-50, 0],
      outputRange: [0, 1]
    })

    return(
      <Animated.View
        style={{
          width: 335*VW,
          // height: 0,
          marginHorizontal: 20,
          backgroundColor: CardColor0,
          position: 'absolute',
          zIndex: 999999999,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: this.getBorderColor(this.state.msg_type),
          transform: [
            {translateX: this.state.panel_value.x},
            {translateY: this.state.panel_value.y},
          ],          
        }}
      >
        <Animated.View
          style={{
            flex: 1,            
            opacity: panel_content_visibility,
          }}
        >
          <Pressable 
            onPress={() => this._close_panel()}
            style={{
              flex: 1,
              
            }}
          >
            <Message
              message={this.state.message}
              description={this.state.description}
              msg_type={this.state.msg_type}
            />
          </Pressable>
        </Animated.View>
      </Animated.View>
    )
  }
}


NotificationPanel.defaultProps = {
  parent_has_statusbar: false,
}