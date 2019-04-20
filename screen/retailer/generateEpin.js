import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right, Left, Body, ListItem, Text,  } from 'native-base';
import { View, StatusBar, Button,} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid  from 'react-native-get-sms-android';
import KeepAwake from 'react-native-keep-awake';
import RNSimData from 'react-native-sim-data'
import {accountAction} from '../../redux/accountAction'
import {vending} from '../../redux/vendaction'
import {requestSmsPermission} from '../../permissions'
import {licence,cpLicence, subCpLicence, retailerLicence} from '../../redux/action'
import {connect} from 'react-redux'

import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';


export  class GenerateEpinScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msidn:'',
      amount: '',
      quantity: '',
      disable: true,
      errorText: '',
      selected2: undefined,
    };

  }

  componentDidMount(){
    this.getPhoneDetails()
    if(this.props.account && this.props.variable ){
      this.setState({
        msidn: this.props.variable.phone,
        amount: this.props.variable.amount,
        quantity: this.props.variable.quantity,
        pin: this.props.account.pin,
      })
    }
  }

getPhoneDetails = ()=> {
  const phoneNumberDetails = RNSimData.getSimInfo().simSerialNumber0
    this.setState({phoneNumberDetails : phoneNumberDetails})
}

  sendSMSNow = (sent, num, count)=>{
    if(sent === false ){
      let message= `EP ${this.state.msidn} ${this.state.amount} 1 ${this.state.pin}`
      let senderId = '433'
      // let count =1 
      if( count <= num ){
        SmsAndroid.autoSend(senderId, message, (fail) => {
            alert("Failed with this error: " + fail)
        }, (success)=> console.log(success))

          Toast.show({
            text: `${count} is Sent`,
            buttonText: 'Okay',
            duration: 2000,
          })
        // count++
        this.listenSMSNow(true, num, count)
        KeepAwake.activate();
      }else{
        alert("Finished")
        KeepAwake.deactivate();
      }
    }
  }

  listenSMSNow= ( sent, num, count) =>{
    if(sent === true){
      this.sendSMSNow( true, num, count)

          let subscription = SmsListener.addListener(message => {
            let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
            let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/

              if (transactionIdRegex.test(message.body)) {
                  this.sendSMSNow(true, num, count) 
                  Toast.show({
                    text: `${count} Transaction Id is received`,
                    duration: 1000,
                  })
              }
              else if (verificationCodeRegex.test(message.body)) {
                  Toast.show({
                    text: `${count} E-Pin is received`,
                    duration: 2000
                  })
                  subscription.remove();
                  count++
                  this.sendSMSNow(false, num, count) 
              }
              else if(!transactionIdRegex.test(message.body)  || !verificationCodeRegex.test(message.body)){
                setTimeout(()=>{
                      alert("Timeout Error:  " +'\nResponse is taking too long.'+`\n${count} sucessfully generated.` +'\nPlease Restart Process.' )
                      this.sendSMSNow(true, num, count)
                      KeepAwake.deactivate();
                    }, 5*60*1000)
                
                SmsListener.addListener(message => {

                  if (verificationCodeRegex.test(message.body)) {
                    Toast.show({
                      text: `${count} E-Pin is received`,
                      duration: 2000
                    })
                    subscription.remove();
                    count++
                    this.sendSMSNow(false, num, count) 
                  }
                  else{
                    alert("Network Error:  "+`\n${count} sucessfully generated.` +'\nPlease Restart Process.' )
                    this.sendSMSNow(true, num, count)
                    KeepAwake.deactivate();
                  }
                })
              }
              
          }) 
    }
        
  }


  _activate = async () => {
    var  sent = false
    const num= +this.state.quantity
    var count = 1

      if(this.state.selected2 === '1'){
        this.sendSMSNow(sent, num, count)
        Toast.show({
          text: 'Processing. Please wait...',
          duration: 1000,
        })
      }
      else if( this.state.selected2 === '2'){
        Toast.show({
          text: 'Feature is currently not enabled',
          duration: 3000,
        })
      }
      else {
        Toast.show({
          text: 'Please select appropriate option.',
          duration: 3000,
        })
      }
    
  }


validateForm = () =>{
  if(+this.state.selected2  &&  this.props.token && (this.props.cpToken || this.props.subCpToken  || this.props.retailerToken)){
    if(!this.props.account.pin){
      Toast.show({
        text: "Please ensure you save your pin in Manage Account Session",
        buttonText: 'Okay',
        duration: 5000
      })

      this.setState({ disable: true})
    }else{
      if( this.state.phoneNumberDetails === this.props.persistedPhoneNumber){
        this.setState({ disable: false})
      }else{
        this.setState({ 
            disable: true,
          })
          Toast.show({
            text: "Please use the registered SIM Card with Device",
            buttonText: 'Okay',
            duration: 2000,
            type: 'warning'
          })
      }
    } 
  }else{
    this.setState({ disable: true})
  }
}

onValueChange2(value: string) {
  this.setState({
    selected2: value
  }, this.validateForm );
}

  
  render() {
    return (
      <Container>
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Option"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Select Option" value="Select Option" />
                <Picker.Item label="Option 1" value="1" />
                <Picker.Item label="Option 2" value="2" />
              </Picker>
            </Item>

          <ListItem icon>
            <Left>
            <Text> MSISDN :</Text>
            </Left>
            <Body><Text> {this.state.msidn} </Text></Body>
          </ListItem>

          <ListItem icon>
            <Left>
            <Text> Amount :</Text>
            </Left>
            <Body><Text> {this.state.amount} </Text></Body>
          </ListItem>

          <ListItem icon>
            <Left>
            <Text> Quantity :</Text>
            </Left>
            <Body><Text> {this.state.quantity} </Text></Body>
          </ListItem>

          <View style={{ paddingTop : 20, color: 'blue' }}>
            <Button
              onPress={this._activate}
              title="Start"
              color="#4169E1"
              accessibilityLabel="Save"
              disabled= {this.state.disable}
            />
          </View>

            <Text style={{paddingTop: 30, color : 'blue'}}
            onPress={()=> this.props.navigation.navigate('VendingVariable')}
            >
            Incorrect Values ?  Edit
            </Text>

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
  account: state.account.account,
  variable: state.vending.vending,
  cpToken: state.cpLicence.token,
  subCpToken: state.subCpLicence.token,
  retailerToken: state.retailerLicence.token,
  persistedPhoneNumber: state.licence.phoneNumber,
})

export default connect(mapStateToProps, {accountAction, vending, licence,  cpLicence, subCpLicence, retailerLicence})(GenerateEpinScreen)