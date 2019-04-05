import {combineReducers} from 'redux'

const merge = (prev, next) => Object.assign({}, prev, next)

// LIcence REducer
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

// Vending Variable Reducer
const vendingReducer = ( state={}, action) => {
  if (action.type === 'VENDING_VARIABLE') {
    return merge( state, { variable : action.payload})
  }

  return state
}


// MANAGE ACCOUNT Reducer
const manageAccountReducer = ( state={}, action) => {
  if (action.type === 'MANAGE_ACCOUNT') {
    return merge( state, { account : action.payload})
  }

  return state
}


// MANAGE CP ACCOUNT Reducer
const manageCPAccountReducer = ( state={}, action) => {
  if (action.type === 'MANAGE_CP_ACCOUNT') {
    return merge( state, { cpAccount : action.payload})
  }

  return state
}


// MANAGE SUB CP ACCOUNT Reducer
const manageSubCpAccountReducer = ( state={}, action) => {
  if (action.type === 'MANAGE_SUBCP_ACCOUNT') {
    return merge( state, { subCpAccount : action.payload})
  }

  return state
}

// MANAGE RETAILER ACCOUNT Reducer
const manageRetailerAccountReducer = ( state={}, action) => {
  if (action.type === 'MANAGE_RETAILER_ACCOUNT') {
    return merge( state, { cpAccount : action.payload})
  }

  return state
}

const reducer = combineReducers({
  licence: licenceReducer,
  vending: vendingReducer, 
  account: manageAccountReducer,
  cpAccount: manageCPAccountReducer,
  subCpAccount: manageSubCpAccountReducer,
  retailerAccount: manageRetailerAccountReducer,

})

export default reducer
