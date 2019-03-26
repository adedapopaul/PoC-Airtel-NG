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

export default  class  SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold'}}>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}