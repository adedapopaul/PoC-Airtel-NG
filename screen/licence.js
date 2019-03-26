
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,   ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Image,ImageBackground,
  StatusBar, } from 'react-native';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation'; 

import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';

import {NavigationActions} from 'react-navigation';

 import Icon from 'react-native-vector-icons/Ionicons';

 import {licence, licenceKey} from '../route/licenceKey'
  


export default class LicenceScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: '',
      serial: '',
      imei: '',
      phoneSerial: '',
      disable: true,
      
    };

  }



_onProcessTextChange = (currentText) =>{
	alert(licenceKey)
        if(!currentText){
          this.setState({
            errorText: "Field can't be empty"
          })
        }  else if(currentText.length > 15 && currentText || !currentText){
          this.setState({
            errorText: 'Maximum length is 15'
          })
        }
        else{
          this.setState({
            errorText: '',
            disable: false
          })
        }
  }


  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column',paddingTop: 30, padding:10}} >
      <KeyboardAvoidingView  behavior="padding" enabled>
        <View style={{}}>
          <ScrollView  >
          <Text style={{ paddingBottom: 8}} >Activation of device require an Internet access. Please ensure your device is connected to the internet to be able to activate your device.</Text>
          <Text style={{color: 'blue'}} > {this.state.errorText} </Text>
          <Text style={{fontWeight: 'bold'}}> Username </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(username) => {
                    this._onProcessTextChange(username);
                    this.setState({username})
                  }}
              value={this.state.username}
              autoCapitalize='none'
            />
            <Text style={{fontWeight: 'bold'}}> Serial Number </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(serial) => {
                    this._onProcessTextChange(serial);
                    this.setState({serial})
                  }}
              value={this.state.serial}
              autoCapitalize='none'
            />
            <View style={{paddingTop: 10}}>
            <Button
              onPress={licence(this.state)}
              title="Activate Device"
              color="#841584"
              accessibilityLabel="Activate Device"
              disabled= {this.state.disable}
            />
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 20}}>
            	<Text style={{ fontSize: 12 }}> This is a new device. 
				   <Text onPress={() => this.props.navigation.navigate('Request')} style={{ color: 'blue' }}> Request for a licence key </Text>
       			 </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      </View>
    );
  }
}