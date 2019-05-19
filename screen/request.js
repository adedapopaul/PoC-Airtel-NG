
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


 export default class  LoginScreen extends React.Component {
 	constructor(props) {
    super(props);
	    this.state = {
	       name: '',
	      username: '',
	      device: '',
	      phone: '',
	      email: '',
	      address: '',
	      message: '',
	    };

  	}

	request =  () => {
		const hold = this.state
  fetch('https://cardgenerationserver.herokuapp.com/v1/request/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
		    name: `${hold.name}`,
		    username: `${hold.username}`,
		    device: `${hold.device}`,
		    phone: `${hold.phone}`,
		    email: `${hold.email}`,
		    address: `${hold.address}`,
		}),
})
    .then((response) => response.json())
    .then((responseJson) => {
    	if(responseJson.message === "Request has been sent"){
 			return  setTimeout(()=> this.props.navigation.navigate('Home'), 3000)
 		}else{
 			this.setState({message : "Network Error"})
 		}
    })
    .catch((error) => {
      this.setState({message : "Network Error"});
    });
}

  	
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column',paddingTop: 10, padding:10}} >
      <KeyboardAvoidingView  behavior="padding" enabled>
          <ScrollView  >
          <Text style={{ paddingBottom: 8}} >Request for Licence key require an Internet access. Please ensure your device is connected to the internet to be able to activate your device.</Text>
          
          <Text style={{fontWeight: 'bold'}}> Full Name </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
          <Text style={{fontWeight: 'bold'}}> Username </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
            <Text style={{fontWeight: 'bold'}}> Device Name & Model </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(device) => this.setState({device})}
              value={this.state.device}
            />
            <Text style={{fontWeight: 'bold'}}> Phone Number </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(number) => this.setState({number})}
              value={this.state.number}
            />
            <Text style={{fontWeight: 'bold'}}> Email </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <Text style={{fontWeight: 'bold'}}> Address </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={(address) => this.setState({address})}
              value={this.state.address}
            />
            <View style={{paddingTop: 5}}>
            <Button
              onPress={this.request}
              title="Request for Licence Key"
              color="#841584"
              accessibilityLabel="Request for Licence Key"
            />
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 20}}>
            	<Text style={{ fontSize: 12 }}> I am a new user. 
				   <Text onPress={() => this.props.navigation.navigate('Contact')} style={{ color: 'blue' }}> Make Enquiry. </Text>
       			 </Text>
            </View>
          </ScrollView>
      </KeyboardAvoidingView>
      </View>
    );
  }
}