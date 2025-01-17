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

const cpLicenceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CP_GET_PHONE_IMEI':
      return merge(state, { phoneImei : action.payload})
  case 'CP_GET_PHONE_SERIAL':
    return merge(state, { phoneSerial : action.payload})
  case 'CP_GET_PHONE_NUMBER':
    return merge(state, { phoneNumber : action.payload})
    case 'CP_LICENCE_FULFILLED':
      return merge(state, {token: action.payload})
    case 'CP_SET_ACTIVATION_MESSAGE':
      return merge(state, {activationMessage: action.payload})
    case 'CP_LICENCE_REJECTED':
      return merge(state, {licenceError: action.payload})
    default:
      return state
  }
}

const subCpLicenceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUB_CP_GET_PHONE_IMEI':
      return merge(state, { phoneImei : action.payload})
  case 'SUB_CP_GET_PHONE_SERIAL':
    return merge(state, { phoneSerial : action.payload})
  case 'SUB_CP_GET_PHONE_NUMBER':
    return merge(state, { phoneNumber : action.payload})
    case 'SUB_CP_LICENCE_FULFILLED':
      return merge(state, {token: action.payload})
    case 'SUB_CP_SET_ACTIVATION_MESSAGE':
      return merge(state, {activationMessage: action.payload})
    case 'SUB_CP_LICENCE_REJECTED':
      return merge(state, {licenceError: action.payload})
    default:
      return state
  }
}

const retailerLicenceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RETAILER_GET_PHONE_IMEI':
      return merge(state, { phoneImei : action.payload})
  case 'RETAILER_GET_PHONE_SERIAL':
    return merge(state, { phoneSerial : action.payload})
  case 'RETAILER_GET_PHONE_NUMBER':
    return merge(state, { phoneNumber : action.payload})
    case 'RETAILER_LICENCE_FULFILLED':
      return merge(state, {token: action.payload})
    case 'RETAILER_SET_ACTIVATION_MESSAGE':
      return merge(state, {activationMessage: action.payload})
    case 'RETAILER_LICENCE_REJECTED':
      return merge(state, {licenceError: action.payload})
    default:
      return state
  }
}

// Vending Variable Reducer
const vendingReducer = ( state={}, action) => {
  if (action.type === 'VENDING_VARIABLE') {
    return merge( state, { vending : action.payload})
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

//handle contact selection for cp
// MANAGE RETAILER ACCOUNT Reducer
const selectedContact = ( state={}, action) => {
  if (action.type === 'CONTACT_DETAILS') {
    return merge( state, { cpContact : action.payload})
  }

  return state
}

//History reducer
const historyReducer = (state = [], action) => {
  if (action.type === 'HISTORY') return [...state, action.payload]
  return state
}

const reducer = combineReducers({
  licence: licenceReducer,  //general licenece management reducer
  cpLicence: cpLicenceReducer,
  subCpLicence: subCpLicenceReducer,
  retailerLicence: retailerLicenceReducer,
  vending: vendingReducer, //manage vending variable
  account: manageAccountReducer,  // this is for the general account management
  cpAccount: manageCPAccountReducer,  // manage the account/pin of the cp
  subCpAccount: manageSubCpAccountReducer,  //manage the account/ pin of the sub cp
  retailerAccount: manageRetailerAccountReducer,  // manage the account/pin of the retailer4
  cpContact: selectedContact,
  history: historyReducer,

})

export default reducer
