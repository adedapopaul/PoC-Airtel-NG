import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right } from 'native-base';
import { View, Text, StatusBar, Button} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid  from 'react-native-get-sms-android';
import {cpAccountAction} from '../../redux/cp/manageCpAccount'
import {licence} from '../../redux/action'
import {connect} from 'react-redux'

import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';


export  class AgentBalanceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msidn:'',
      disable: true,
      errorText: '',
    };

  }


  _activate = async () => {
    let pin = this.props.pin
    let message = `BAL ${this.state.msidn} ${pin}`
    SmsAndroid.autoSend('433',message , (fail) => {
      alert("Failed with this error: " + fail)
    }, (success)=> console.log(success))
   
    Toast.show({
      text: "Request Sent. Processsing... ",
      buttonText: 'Okay',
      duration: 5000,

    })
    let subscription = SmsListener.addListener(message => {
            // let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
            // let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/

            //   if (transactionIdRegex.test(message.body)) {
            //       sendSMSNow(true, num, count) 
            //   }
            //   else if (transactionIdRegex.test(message.body)) {
            //       subscription.remove();
            //       count++
            //       sendSMSNow(false, num, count) 
            //   }
            //   else{
            //     const stopSending = setTimeout(()=>{
            //       return true
            //     }, 5*1000)
            //     if(stopSending){
            //       alert("Network Error:  " +'\nPlease Restart Process.' )
            //       sendSMSNow(true, num, count)
            //       KeepAwake.deactivate();
            //     }
                
            //   }

            this.setState({ message : message.body, dialogVisible: true,})
            subscription.remove();

          })

  }


validateForm = () =>{
  if(this.state.msidn &&  this.props.token){
    this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
  }
}

_handlePhoneNumber =phoneNumber=>{
  if (+phoneNumber>=0 && phoneNumber.length <= 11 ){
    this.setState({
      msidn: phoneNumber,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Phone Number can't be empty or more than 11 digits"
    })
  }
}

  render() {
    return (
      <Container>
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          

          <Item>
            <Icon active name='md-call' />
            <Input placeholder="MSISDN"
              keyboardType={'numeric'}
              onChangeText={this._handlePhoneNumber}
              value={this.state.msidn}
            /> 
            <Right>
            <Icon active name="md-person-add" style={{ backgroundColor: "#48D1CC", }} />
            </Right>
          </Item>

          <View style={{ paddingTop : 20 }}>
            <Button
              onPress={this._activate}
              title="Submit"
              color="#4169E1"
              accessibilityLabel="Save"
              disabled= {this.state.disable}
            />
            </View>

            <Dialog
                visible={this.state.dialogVisible}
                title="Message"
                onTouchOutside={() => this.setState({dialogVisible: false})} 
                onRequestClose = {() => this.setState({dialogVisible: false})}>
              <View>
                  <View>
                  <Text style={{ fontSize: 16 }}>
                  {this.state.message} 
                  </Text>
                  </View>
                  
                  <View style={{paddingTop : 10}}> 
                  <Button
                  onPress={() => this.setState({dialogVisible: false})}
                  title="Close"
                  color="#48D1CC"
                  accessibilityLabel="Close"
                  />
                </View>
              </View>
            </Dialog>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.licence.token,
  pin: state.cpAccount.cpAccount.pin,
})

export default connect(mapStateToProps, {cpAccountAction,licence})(AgentBalanceScreen)