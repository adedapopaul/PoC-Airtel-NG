
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,   ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Image,
  StatusBar, } from 'react-native';

import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux'

import {licence} from '../redux/action'



export class LicenceScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: '',
      serial: '',
      disable: true,
      activationMessage: ''
    };

  }


componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.setState({
        disable: false,
        serial: '',
        username: ''
      })
    }else{
      this.setState({
        activationMessage: 'Your Device has not been activated'
      })
    }
}

 _activate = async () => {
    this.props.licence(this.state.username, this.state.serial)
  }


validateForm = () =>{
  if(this.state.username && this.state.serial ){
    this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
  }
}

_handleUsername =username=>{
  if (username.length>=0 && username.length <= 30 ){
    this.setState({
      username,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Username can't be empty or loneger than 30 letters"
    })
  }
}


_handleSerial =serial=>{
  if (serial.length>=0 && serial.length <= 30){
    this.setState({
      serial,
      errorText : ""
    }, this.validateForm)
  }else{
    this.setState({
      errorText : "Serial field can't be empty or longer than 30 letters"
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
          <Text style={{color: 'blue'}} > {this.props.activationMessage} </Text>
          <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Text style={{fontWeight: 'bold'}}> Username </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={this._handleUsername}
              value={this.state.username}
              autoCapitalize='none'
            />
            <Text style={{fontWeight: 'bold'}}> Serial Number </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              onChangeText={this._handleSerial}
              value={this.state.serial}
              autoCapitalize='none'
            />
            <View style={{paddingTop: 10}}>
            <Button
              onPress={this._activate}
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

            <View style={{ flexDirection: 'row', paddingTop: 20}}>
              <Text style={{ fontSize: 12 }}> Available om request. 
           <Text onPress={() => this.props.navigation.navigate('7DaysTrial')} style={{ color: 'blue' }}> 7 Days Trial </Text>
             </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  token: state.licence.token,
  activationMessage : state.licence.activationMessage
})

export default connect(mapStateToProps, {licence})(LicenceScreen)