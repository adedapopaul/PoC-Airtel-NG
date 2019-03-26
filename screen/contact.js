
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


export default class ContactScreen extends React.Component {
  render() {
    return (
      <ScrollView>
      <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', padding: 15}}>
      
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Contact</Text>
      </View>
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
          onPress={() => console.log('Contact') }
        />
      </View>
      </View>
      </ScrollView>
    );
  }
}