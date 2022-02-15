import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  // Navigation State Actions
  SET_CURRENT_STATE,

  // user actions
  LOGIN_USER,
  LOGOUT_USER,
} from './actions'


// Navigation State Actions
export const changeAppCurrentState = current_state => dispatch => {
  dispatch({
    type: SET_CURRENT_STATE,
    payload: {
      current_state,
    }
  })
}

export const logIn = () => async dispatch => {
  dispatch({type: LOGIN_USER})
}


export const logOut = (phone, estate_id, host, new_app_state) => async dispatch => {  
  var is_available = await SecureStore.isAvailableAsync()

  const keys = ['@issueTypes'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(e);
  }        

  if (is_available) {      
    await SecureStore.deleteItemAsync('tokens')
    dispatch({
      type: LOGOUT_USER,
      payload: {
        new_app_state,
      }
    })
  }

  var activity_log_params = {
    phone,
    action: 'Logged out',
    status: 'Success',
    message: `Brand: ${modelName},\n Version: ${osVersion},\n Device name: ${deviceName}`,
    estate_id: estate_id,
  }
  console.log('activity_log_params', activity_log_params)

  await activity_log(activity_log_params, host)
  
  
}
