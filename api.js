import IMEI from 'react-native-imei'
import DeviceInfo from 'react-native-device-info';

export const requestLicence = async (username, serial, imei, phoneSerial) => {
	const response = await fetch('https://cardgenerationserver.herokuapp.com/v1/licence/licence', {
	    method: 'PUT',
	    headers: {'content-type': 'application/json'},
	    body: JSON.stringify({
		    username,
		    serial,
		    imei,
		    phoneSerial,
		    // address: `${hold.address}`,
		}),
	  })
	const responseJson = await response.json()
  	if (responseJson.licenceKey) {
	     return responseJson.licenceKey
	  }
	  else { 
   	 		// const errMessage = responseJson.message
  			alert(responseJson.message)
  	 	}

}


export const getPhoneImei = ()=> {
	IMEI.getImei().then(imei => {
    	return imei
	})
}


export const getPhoneSerial = ()=> {
	const serialNumber = DeviceInfo.getSerialNumber();
	return serialNumber
}


export const getPhoneNumber = ()=> {
	const phoneNumber = DeviceInfo.getPhoneNumber();
	return phoneNumber
}


export const getMacAddress = ()=> {
	DeviceInfo.getMACAddress().then(mac => {
  		// "E5:12:D8:E5:69:97"
  		return mac
	});
}