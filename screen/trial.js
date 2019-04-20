
import React, { Component } from 'react';
// import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

import { Platform, StyleSheet, Text, View,ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView, Button, StatusBar } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux'

import {trialLicence} from '../redux/action'



export class TrialLicenceScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: '',
      serial: '',
      disable: true,
      trialActivationMessage: ''
    };

  }


componentWillReceiveProps(nextProps) {
    if (nextProps.trialToken) {
      this.setState({
        disable: false,
        serial: '',
        username: ''
      })
    }else{
      this.setState({
        trialActivationMessage: 'Your Device has not been activated'
      })
    }
}

 _activate = async () => {
    this.props.trialLicence(this.state.username, this.state.serial)
  }


validateForm = () =>{
  if(this.state.username && this.state.serial && !this.props.retailerToken){
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
      <Container style={{ padding : 10}} >
      < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
        <Content>
        <Text style={{ paddingTop : 10}}>This is a 7 days trial Licence. Please ensure your device is connected to the internet.</Text>
        <Text style={{color: 'blue'}} > {this.props.trialActivationMessage} </Text>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
              onChangeText={this._handleUsername}
              value={this.state.username}
              autoCapitalize='none'
               />
            </Item>
            <Item floatingLabel last>
              <Label>Serial Number</Label>
              <Input
              onChangeText={this._handleSerial}
              value={this.state.serial}
              autoCapitalize='none'
               />
            </Item>

            <View style={{ paddingTop : 20 }}>
            <Button
              onPress={this._activate}
              title="Activate Device"
              color="#841584"
              accessibilityLabel="Activate Device"
              disabled= {this.state.disable}
            />
            </View>
            
          </Form>
         
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  trialToken: state.retailerLicence.token,
  trialActivationMessage : state.retailerLicence.activationMessage
})

export default connect(mapStateToProps, {trialLicence})(TrialLicenceScreen)




