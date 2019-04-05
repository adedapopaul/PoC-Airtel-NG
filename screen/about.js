
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,   ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Image,ImageBackground,
  StatusBar, } from 'react-native';

// import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation'; 

import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';

import {NavigationActions} from 'react-navigation';

 // import Icon from 'react-native-vector-icons/Ionicons';


export default class  AboutScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',alignItems: 'stretch', padding: 15}}>
	      <ScrollView >
	      <View>
	      	<Text>
	      	This software is solely develop by Jyqwins Limited. It is the property of Jyqwins Limited and the licence can be obtain by contacting the Lead developer.
	      	</Text>
	      	<Text style={{ paddingTop: 8, fontWeight: 'bold'}}>Version</Text>
	      	<Text> 1.0.10 </Text>
	      </View>
	      <View style={{ paddingTop: 20}}>
	        <Button
	          title="Contact Us"
	          color="#841584"
	          onPress={() => this.props.navigation.navigate('Contact')}
	        />
	      </View>
	      </ScrollView>
      </View>
    );
  }
}