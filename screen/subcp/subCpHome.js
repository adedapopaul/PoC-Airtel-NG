import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Toast } from 'native-base';
import {StatusBar, View} from 'react-native'

import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid  from 'react-native-get-sms-android';
import {licence, subCpLicence} from '../../redux/action'
import {connect} from 'react-redux'
import {subCpAccountAction} from '../../redux/subcp/manageSubCpAccount'

import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';


export  class  SubCPHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      message: '',
      isOn: 'Off',
      activation: false,
    };

  }

  componentDidMount(){
    if(this.props.subCpToken){
      this.setState({
        activation: true,
        isOn: 'On'
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.setState({
        disable: true,
      })
    }else{
      this.setState({
        disable: false
      })
    }
  }


checkBalance = ()=> {
    let pin = this.props.subCp.pin
    let message = `BAL ${pin}`
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

  lastTransfer = ()=> {
    let pin = this.props.subCp.pin
    let messageBody = `LR ${pin}`
    SmsAndroid.autoSend('433',messageBody , (fail) => {
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



  dailyReport = ()=> {
    let pin = this.props.subCp.pin
    let message = `DSR ${pin}`
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


  render() {
    return (
      <Container>
      < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="md-checkmark" />
              </Button>
            </Left>
            <Body>
              <Text>Sub CP Activation Status</Text>
            </Body>
            <Right>
              <Text>{this.state.isOn}</Text>
              <Switch value={this.state.activation} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#800080" }}>
                <Icon active name="md-pin" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>this.props.navigation.navigate('ManageSubCP')}>Manage Sub CP Account</Text>
            </Body>
            <Right>
              <Text>Stock</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-code-working" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>this.props.navigation.navigate('SubCpStockTransfer')}>Transfer Stock</Text>
            </Body>
            <Right>
              <Text>Stock</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-gift" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>this.props.navigation.navigate('SubCpRechargeCustomer')}>Recharge Customer</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-journal" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.lastTransfer}>Transfer Report</Text>
            </Body>
            <Right>
              <Text>Last Transfer</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-cash" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.checkBalance}>Check Balance</Text>
            </Body>
            <Right>
              <Text>Stock Balance</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-briefcase" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>this.props.navigation.navigate('SubCpAgentBalance')}>Agent Balance</Text>
            </Body>
            <Right>
              <Text>Check</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="md-folder" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.dailyReport}>Daily Report</Text>
            </Body>
            <Right>
              <Text>Report</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#A0522D" }}>
                <Icon active name="md-person-add" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>this.props.navigation.navigate('SubCpSaveContact')}>Save Agent Details</Text>
            </Body>
            <Right>
              <Text>Stats</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
         
            <Dialog
            visible={this.state.dialogVisible}
            title="Message"
            onTouchOutside={() => this.setState({dialogVisible: false})} 
            onRequestClose = {() => this.setState({dialogVisible: false})}
          >
            <Text style={{ fontSize: 16, paddingBottom: 14 }}>
              {this.state.message} 
            </Text>

            <Button block onPress={() => this.setState({dialogVisible: false})}>
              <Text>Close</Text>
            </Button>
          </Dialog>

        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  token: state.licence.token,
  activationMessage : state.licence.activationMessage,
  subCp: state.subCpAccount.subCpAccount,
  subCpToken: state.subCpLicence.token,

})

export default connect(mapStateToProps, {licence, subCpAccountAction, subCpLicence})(SubCPHomeScreen)