import {combineReducers} from 'redux'


import {
  // Navigation State Actions
  SET_CURRENT_STATE,

  // user actions
  LOGIN_USER,
  LOGOUT_USER,
} from './actions'

import { DEFAULT_STATE } from './default_state'


const navigationStateReducer = (state = DEFAULT_STATE.navigation_state, action) => {
  switch (action.type) {		  				
		case LOGOUT_USER:
			return {              
				...state,
				current_state: action.payload.new_app_state,
			}     		 				
		default:
			return state
  }
}

const userReducer = (state = DEFAULT_STATE.user, action) => {
  switch (action.type) {				
		default:
			return state
  }
}


const reducer = combineReducers({
	navigation_state: navigationStateReducer,
	user: userReducer,
})

export default reducer