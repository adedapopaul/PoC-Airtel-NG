import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Toast } from 'native-base';
import { View, Text, Button} from 'react-native'

import SmsAndroid  from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener'

import {connect} from 'react-redux'
import {requestSmsPermission} from '../permissions'
import {licence} from '../redux/action'

export class ChangePinScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      old: '',
      newpin: '',
      confirm: '',
      disable: true,
      errorText: ''
    };

  }

  // componentWillUnmount(){
  //   subscription.remove();
  // }

  _activate = async () => {
    let message= `CP ${this.state.old} ${this.state.newpin} ${this.state.confirm}`
    let senderId = '433'
    this.props.requestSmsPermission()
      .then(function (didGetPermission: boolean) {
            if (didGetPermission) {

              SmsAndroid.autoSend(senderId, message, (fail) => {
                alert("Failed with this error: " + fail)
              }, (success)=> console.log(success))

              Toast.show({
                text: 'Processing. Please wait...',
                duration: 5000,
              })

              let subscription = SmsListener.addListener(message => {
                  alert(message.body)
              })
            }
            else{
              alert("App can't work without the permission")
            }
        })
    
  }


validateForm = () =>{
  if(this.state.old && this.state.newpin && this.state.confirm && this.props.token){
    this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
  }
}

_handleOld =old=>{
  if (old.length>=0 && old.length <= 4 ){
    this.setState({
      old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Pin can't be empty or loneger than 4 digits"
    })
  }
}

_handleNew =old=>{
  if (old.length>=0 && old.length <= 4 ){
    this.setState({
      newpin: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Pin can't be empty or loneger than 4 digits"
    })
  }
}

_handleConfirm =old=>{
  if (old.length>=0 && old.length <= 4 ){
    this.setState({
      confirm: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Pin can't be empty or loneger than 4 digits"
    })
  }
}
  render() {
    return (
      <Container>
        <Content >
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Form style={{ padding : 10}}>
            <Item floatingLabel>
              <Label>Old Pin</Label>
              <Icon active name='md-pin' />
              <Input 
              keyboardType={'numeric'}
              onChangeText={this._handleOld}
              value={this.state.old}
              />
            </Item>
            <Item floatingLabel last>
              <Label>New Pin</Label>
              <Icon active name='md-pin' />
              <Input 
              keyboardType={'numeric'}
              onChangeText={this._handleNew}
              value={this.state.newpin}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Pin</Label>
              <Icon active name='md-pin' />
              <Input
              keyboardType={'numeric'}
              onChangeText={this._handleConfirm}
              value={this.state.confirm}
               />
            </Item>

            <View style={{ paddingTop : 20 }}>
            <Button
              onPress={this._activate}
              title="Change Pin"
              color="#841584"
              accessibilityLabel="Change Pin"
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
  token: state.licence.token,
})

export default connect(mapStateToProps, {licence})(ChangePinScreen)