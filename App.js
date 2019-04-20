import React,{Component} from 'react';
import Navigator from './route/route';

import { Root } from "native-base";
import {StatusBar, PermissionsAndroid} from 'react-native'

import {createStore} from 'redux';

import {store, persistor} from './redux/index'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Loader from './screen/loader'

export default class App extends Component{

	
	// //Checking for the permission just after component loaded   
 //    async function requestCameraPermission() {
 //      try {
 //        const granted = await PermissionsAndroid.requestMultiple(
 //          [PermissionsAndroid.PERMISSIONS.CALL_PHONE, PermissionsAndroid.PERMISSIONS.SEND_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS,
 // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE ],{
 //            'title': 'ERC-Airtel NG Permissions',
 //            'message': 'ERC-Airtel NG require your permission to read phone states and properties for optimal performance. '
 //          }
 //        )
 //        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 //          //To Check, If Permission is granted
 //          console.log("You can use the CAMERA");
 //        } else {
 //          alert("Permission denied. App might not perform well.");
 //        }
 //      } catch (err) {
 //        alert("err",err);
 //        console.warn(err)
 //      }
 //    }
 //    if (Platform.OS === 'android') {
 //        //Calling the permission function
 //        requestCameraPermission();
 //    }else{
 //        alert('IOS device found');
 //    }

    render(){
        return(
	      <Provider store={store}>
	        <PersistGate loading={null} persistor={persistor}>
	        <Root>
	        < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
	          <Navigator/>
	        </Root>
	        </PersistGate>
	      </Provider> 
        )
    }
}