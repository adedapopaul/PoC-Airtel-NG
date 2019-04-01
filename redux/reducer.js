import {combineReducers} from 'redux'

const merge = (prev, next) => Object.assign({}, prev, next)


const licenceReducer = (state = {}, action) => {
  switch (action.type) {
  	case 'GET_PHONE_IMEI':
  		return merge(state, { phoneImei : action.payload})
	case 'GET_PHONE_SERIAL':
		return merge(state, { phoneSerial : action.payload})
	case 'GET_PHONE_NUMBER':
		return merge(state, { phoneNumber : action.payload})
    case 'LICENCE_FULFILLED':
      return merge(state, {token: action.payload})
    case 'SET_ACTIVATION_MESSAGE':
      return merge(state, {activationMessage: action.payload})
    case 'LICENCE_REJECTED':
      return merge(state, {licenceError: action.payload})
    default:
      return state
  }
}

const reducer = combineReducers({
  licence: licenceReducer

})

export default reducer
