import {requestLicence, getPhoneImei, getPhoneSerial, getPhoneNumber} from '../api'
import IMEI from 'react-native-imei'
import DeviceInfo from 'react-native-device-info';

import RNSimData from 'react-native-sim-data'
// async action creator
export const licence = (username, serial) => async dispatch => {
  const imei = await IMEI.getImei().then(imei => {
    					return imei
						})
  const phoneSerial = await getPhoneSerial()
  const phoneNumber = await RNSimData.getSimInfo().simSerialNumber0
  // alert(phoneNumber)
  dispatch({type: 'LICENCE_SENT'})
  try {
  	// get the phone imei number
  	dispatch({type: 'GET_PHONE_IMEI', payload: imei})
  	// get the phone serial number
  	dispatch({type: 'GET_PHONE_SERIAL', payload: phoneSerial})

  	// get the phone number
  	dispatch({type: 'GET_PHONE_NUMBER', payload: phoneNumber})

  	//send request for licence
    const token = await requestLicence(username, serial, imei, phoneSerial)

    if(token){ dispatch({type: 'SET_ACTIVATION_MESSAGE', payload: 'Your Device has been activated successfully.'}) }
    // alert(token)
    dispatch({type: 'LICENCE_FULFILLED', payload: token})

  } catch (err) {
    dispatch({type: 'LICENCE_REJECTED', payload: err.message})
  }
}