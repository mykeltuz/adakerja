import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  // Navigation State Actions
  SET_CURRENT_STATE,

  // user actions
  LOGIN_USER,
  LOGOUT_USER,
} from './actions'

import {
  deleteSecureData
} from '../src/utils/handleStorage'


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


export const logOut = () => async dispatch => {     
  deleteSecureData('github_access_token')
  dispatch({
    type: LOGOUT_USER,
    payload: {
      new_app_state: 'authenticate',
    }
  })
  
}
