import React from 'react'
import {
  ImageBackground,
  Text,
  Dimensions,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { BlurView } from 'expo-blur'

// app theme colors
import {
  ScreenBackgroundColor0,
  Green,
  SecondaryAccentColor,
} from '../utils/appTheme'

import SafeAreaView from './SafeAreaView'
 

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const VW = width /375
const VH = height / 812

class BaseComp extends React.PureComponent {
  state = {
    network_status: null,
    display_status: 'show_nothing', //show_error show_success show_nothing
    is_first_render: true,
  }

  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(async state => {
      console.log('net state', state)

      if (!state.isInternetReachable) {
        console.log('no network')
        await this.handleDisplayStatusChange('show_error')        
      } else {
        console.log('network available')
        var that = this
        if(!this.state.is_first_render) {
          await this.handleDisplayStatusChange('show_success')
          setTimeout(that.removeStatusDisplay, 10000)
        } else {
          await this.setState({
            ...this.state,
            is_first_render: false,
          })
        }
        
      }
    });
  }

  handleDisplayStatusChange = async value => {
    await this.setState({
      ...this.state,
      display_status: value,
      is_first_render: false,
    })
  }

  removeStatusDisplay = () => {
    this.setState({
      ...this.state,
      display_status: 'show_nothing'
    })
  }

  render () {
    if (this.props.bg_type === 'image') {
      return  (
        <ImageBackground
          source={this.props.source}
          width={width}
          height={height}
          style={{
            width: width,
            height: '100%',
            backgroundColor: ScreenBackgroundColor0,
          }}
          resizeMode='stretch'
        >
          <BlurView
            intensity={60}
            tint= 'light'
            style={{
              // backgroundColor: ScreenBackgroundColor0,
              flex: 1
            }}
          >
            <SafeAreaView 
              barStyle="light-content" 
              style={[{
                flex: 1,
              },
              (this.state.display_status === 'show_success') && ({
                backgroundColor: Green,
              }),
              (this.state.display_status === 'show_error') && ({
                backgroundColor: 'red',
              }),
              ]}
            > 
              {
                (this.state.display_status === 'show_nothing') ? (
                  <>
                  {this.props.children}
                  </>
                ) : (
                  <ImageBackground
                    source={this.props.source}
                    width={width}
                    height={height}
                    style={{
                      width: width,
                      height: height,
                      backgroundColor: ScreenBackgroundColor0,
                    }}
                    resizeMode='stretch'
                  >
                          
          
                    {
                      (this.state.display_status === 'show_success') && (
                        <View
                          style={{
                            width: width,
                            height: 25,
                            backgroundColor: Green,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <MaterialCommunityIcons
                            size={15}
                            color='white'
                            name='cloud-outline'
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              textAlign: 'center',
                              marginLeft: 10,
                            }}
                          >
                            Internet connection is available
                          </Text>
                        </View>
                      )
                    }
                    
                    {
                      (this.state.display_status === 'show_error') && (
                        <View
                          style={{
                            width: width,
                            height: 25,
                            backgroundColor: 'red',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <MaterialCommunityIcons
                            size={15}
                            color='white'
                            name='cloud-off-outline'
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              textAlign: 'center',
                              marginLeft: 10,
                            }}
                          >
                            No Internet connection
                          </Text>
                        </View>
                      )
                    }
          
                    
                    {this.props.children}
                  
                  
                  </ImageBackground>
            
                )
              }
            <StatusBar style='light' />
            </SafeAreaView>
          </BlurView>
        </ImageBackground>
      )
    } else if (this.props.bg_type === 'solid_color') {
      return (
        <SafeAreaView 
          barStyle="dark-content" 
          style={[{
            flex: 1,
            color: 'black'
          },
          (this.state.display_status === 'show_success') && ({
            backgroundColor: Green,
          }),
          (this.state.display_status === 'show_error') && ({
            backgroundColor: 'red',
          }),
          (this.state.display_status === 'show_nothing') && ({
            backgroundColor: ScreenBackgroundColor0,
          }),
          ]}
        > 
          {
            (this.state.display_status === 'show_success') && (
              <View
                style={{
                  width: width,
                  height: 25,
                  backgroundColor: Green,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons
                  size={15}
                  color='white'
                  name='cloud-outline'
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    marginLeft: 10,
                  }}
                >
                  Internet connection is available
                </Text>
              </View>
            )
          }
                
          {
            (this.state.display_status === 'show_error') && (
              <View
                style={{
                  width: width,
                  height: 25,
                  backgroundColor: 'red',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons
                  size={15}
                  color='white'
                  name='cloud-off-outline'
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    marginLeft: 10,
                  }}
                >
                  No Internet connection
                </Text>
              </View>
            )
          }

          <View 
            style={{
              backgroundColor: ScreenBackgroundColor0,
              flex: 1,
            }}
          >
            {this.props.children}
          </View>
          <StatusBar style={this.state.display_status === 'show_nothing' ? 'dark' : 'light'} />
      
        </SafeAreaView>        
      )
    }
    
  }
  
}

export default BaseComp