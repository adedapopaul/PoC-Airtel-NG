import React,{Component} from 'react';
import Navigator from './route/route';

import { Root } from "native-base";
import {StatusBar} from 'react-native'

import {createStore} from 'redux';

import {store, persistor} from './redux/index'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Loader from './screen/loader'

export default class App extends Component{
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