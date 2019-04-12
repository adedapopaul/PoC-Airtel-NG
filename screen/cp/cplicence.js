
import React, { Component } from 'react';
// import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

import { Platform, StyleSheet, Text, View,ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView, Button } from 'react-native';

import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux'

import {cpLicences} from '../../redux/action'



export class CpLicenceScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: '',
      serial: '',
      disable: true,
      cpActivationMessage: ''
    };

  }


componentWillReceiveProps(nextProps) {
    if (nextProps.cpToken) {
      this.setState({
        disable: false,
        serial: '',
        username: ''
      })
    }else{
      this.setState({
        cpActivationMessage: 'Your Device has not been activated'
      })
    }
}

 _activate = async () => {
    this.props.cpLicences(this.state.username, this.state.serial)
  }


validateForm = () =>{
  if(this.state.username && this.state.serial && !this.props.cpToken){
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
          <Text style={{ paddingBottom: 8}} >Activation of device require an Internet access. Please ensure your device is connected to the internet.</Text>
          <Text style={{color: 'blue'}} > {this.props.cpActivationMessage} </Text>
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
              color="#4169E1"
              accessibilityLabel="Activate Device"
              disabled= {this.state.disable}
            />
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 20}}>
              <Text style={{ fontSize: 12 }}> This is a new device. 
           <Text onPress={() => this.props.navigation.navigate('7DaysTrial')} style={{ color: 'blue' }}> Request for 7 Days Trial </Text>
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
  cpToken: state.cpLicence.token,
  cpActivationMessage : state.cpLicence.activationMessage
})

export default connect(mapStateToProps, {cpLicences})(CpLicenceScreen)


