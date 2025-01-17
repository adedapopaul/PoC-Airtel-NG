
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,   ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Image,ImageBackground,
  StatusBar, } from 'react-native';

import { createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation'; 

import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';

import {NavigationActions} from 'react-navigation';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {requestCallPermission} from '../permissions'

export default class ContactScreen extends React.Component {

  conponentDidMount(){
    this.props.requestCallPermission()
      .then(function (didGetPermission: boolean) {
            if (didGetPermission) {
              console.log('Permission granted')
            }
            else{
              alert('App might not work properly.')
            }
        })
  }

  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', padding: 15}}>

      <View style={{ flexDirection: 'column', paddingTop:10}}>
        <Text style={{fontWeight: 'bold'}} >Address: </Text>
        <Text>2 Airtel Shop, Oluwaga Bus Stop, Ayobo,Lagos State.</Text>
      </View>

      <View style={{ flexDirection: 'column',paddingTop:10}}>
        <Text style={{fontWeight: 'bold'}} >Email: </Text>
        <Text> adedapopaul@yahoo.com</Text>
      </View>

      <View style={{ flexDirection: 'column',paddingTop:10}}>
        <Text style={{fontWeight: 'bold'}} >Phone: </Text>
        <Text> 08167876460</Text>
      </View>
      
      <View style={{ paddingTop: 15}}>
        <Button
          title="Call Us"
          color="#841584"
          onPress={() => RNImmediatePhoneCall.immediatePhoneCall('+2348167876460') }
        />
      </View>
      </View>
      </ScrollView>
    );
  }
}