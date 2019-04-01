import React,{Component} from 'react';
// import Navigator from './route/route';
import SmsAndroid  from 'react-native-get-sms-android';
import { Platform, StyleSheet, Text, View,ScrollView,
        TouchableOpacity,TextInput,KeyboardAvoidingView,Button,Image} from 'react-native';
       
import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';
import SmsListener from 'react-native-android-sms-listener'
import KeepAwake from 'react-native-keep-awake';
import {connect} from 'react-redux'

import {licence} from '../redux/action'
import RNSimData from 'react-native-sim-data'

// const phoneNumber = RNSimData.getSimInfo().deviceId0

var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    address: '*********', // sender's phone number
    indexFrom: -1, // start from index 0
    maxCount: 2, // count of SMS to return each time
};


export class SimClass extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      amount: '',
      password: '',
      quantity: '',
      disable: true,
      activationMessage: '',
      phoneNumberDetails: ''
    }


  sendSMSNow = (sent, num, count)=>{
    if(sent === false ){
      let hold = this.state
      let message= `********************`
      let senderId = '***********'
      // let count =1 
      if( count <= num ){
        openProgress() 
        SmsAndroid.autoSend(senderId, message, (fail) => {
            alert("Failed with this error: " + fail)
        }, (success)=> console.log(success))
        // count++
        listenSMSNow(true, num, count)
        KeepAwake.activate();
      }else{
        alert("Finished")
        KeepAwake.deactivate();
      }
    }
  }

  listenSMSNow= ( sent, num, count) =>{
    if(sent === true){
      sendSMSNow( true, num, count)
          let subscription = SmsListener.addListener(message => {
            let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
            let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/

              if (transactionIdRegex.test(message.body)) {
                  sendSMSNow(true, num, count) 
              }
              else if (verificationCodeRegex.test(message.body)) {
                  subscription.remove();
                  count++
                  sendSMSNow(false, num, count) 
              }
              else{
                alert("Error:  " +'\nPlease Restart Process.' +'\nMessage Body: '+ message.body)
                sendSMSNow(true, num, count)
                KeepAwake.deactivate();
              }
          }) 
    }
        
  }
  openProgress = () => {
    this.setState({ showProgress: true });

    setTimeout(() => {
        this.setState({ showProgress: false });
    },4000)
  }

  listenSms= ()=> {
    var  sent = false
    let smsEntered = false
    clearSending = false
    const num = +this.state.quantity
    var count = 1 
    sendSMSNow(sent, num, count)      
        
  }
             
          
             

}


componentDidMount(){
  this.getPhoneDetails()
}

getPhoneDetails = ()=> {
  const phoneNumberDetails = RNSimData.getSimInfo().simSerialNumber0
    this.setState({phoneNumberDetails : phoneNumberDetails})
}

getSMS = ()=> {
  SmsAndroid.list(JSON.stringify(filter), (fail) => {
      alert("Failed with this error: " + fail)
  },
  (count, smsList) => {
      // alert('Count: ', count);
      // alert('List: ', smsList);
      var arr = JSON.parse(smsList);

      arr.forEach(function(object){
          // alert( object);
          alert(object.body);
          // console.log("-->" + object.body);
      })
  })
}



validateForm = () =>{
  if(this.state.phoneNumber && this.state.password && this.state.amount && this.state.quantity ){
    // alert(this.props.persistedPhoneNumber)
      if(this.props.persistedPhoneNumber && this.props.token){
        if( this.state.phoneNumberDetails === this.props.persistedPhoneNumber){
          // alert(this.props.persistedPhoneNumber +'\nPlease Restart Process.' +'\n'+ this.props.persistedPhoneNumber)
          this.setState({ disable: false})
        }else{
          this.setState({ 
            dialogVisible: true,
            disable: true,
            activationMessage: 'Please use the registered SIM Card with Device'
          })
        }
      }
      else{
        this.setState({
         disable: true,
         activationMessage: 'Your Device has not been activated'
       })
      }
    
  }else{
    this.setState({ disable: true})
  }
}

_handlePhoneNumber =phoneNumber=>{
  if (+phoneNumber>=0 && phoneNumber.length <= 15 ){
    this.setState({
      phoneNumber,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Phone Number can't be empty or more than 15 digits"
    })
  }
}


_handlePassword =password=>{
  if (+password>=0 && password.length <= 8){
    this.setState({
      password,
      errorText : ""
    }, this.validateForm)
  }else{
    this.setState({
      errorText : "Password can't be empty or more than 8 digits"
    })
  }
}

_handleAmount =amount=>{
  if (+amount>=0  && amount.length <= 5 ){
    this.setState({
      amount,
      errorText : ""
    }, this.validateForm)
  }else{
  this.setState({
      errorText : "Amount can't be empty or more than 5 digits"
    })
  }
}


_handleQuantity =quantity=>{
  if (+quantity >=0  && quantity.length<= 10){
    this.setState({
      quantity,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Quantity can't be empty or more than 10 digits"
    })
  }
}

    render(){
        return(
          <View style= {{ flex: 1, flexDirection: 'column',paddingTop: 30, padding:10}}>
           <KeyboardAvoidingView  behavior="padding" enabled>
        <View style={{}}>
          <ScrollView  >
          <Text style={{color: 'red'}} > {this.state.errorText} </Text>
          <Text style={{color: 'blue'}} > {this.state.activationMessage} </Text>
          <Text style={{fontWeight: 'bold'}}> Phone Number </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={this._handlePhoneNumber}
              value={this.state.phoneNumber}
            />
            <Text style={{fontWeight: 'bold'}}> Amount </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={this._handleAmount}
              value={this.state.amount}
            />

            <Text style={{fontWeight: 'bold'}}> Password </Text>
             <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={this._handlePassword}
              value={this.state.password}
            />
            <Text style={{fontWeight: 'bold',}}> Quantity </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={this._handleQuantity}
              value={this.state.quantity}
            />

            <View style={{paddingTop: 10}}>
            <ProgressDialog
              visible={this.state.progressVisible}
              title="Sending SMS"
              message="Please, wait..."
          />

            <Button
              onPress={listenSms}
              title="Start"
              color="#841584"
              accessibilityLabel="Start Now"
              disabled= {this.state.disable}
            />


            <ProgressDialog
              title="Sending SMS"
              activityIndicatorColor="blue"
              activityIndicatorSize="large"
              animationType="slide"
              message="Please, wait..."
              visible={ this.state.showProgress }
            />

            <View>
            <Dialog
                visible={this.state.dialogVisible}
                title="Activation Message"
                onTouchOutside={() => this.setState({dialogVisible: false})} 
                onRequestClose = {() => this.setState({dialogVisible: false})}>
              <View>
                  <View>
                  <Text style={{ fontSize: 16 }}>
                  Please use the registered SIM Card with Device 
                  </Text>
                  </View>
                  
                  <View style={{paddingTop : 10}}> 
                  <Button
                  onPress={() => this.setState({dialogVisible: false})}
                  title="Close"
                  color="#841584"
                  accessibilityLabel="Close"
                  />
                </View>
              </View>
            </Dialog>
            </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
            </View>
        )
    }
}


const mapStateToProps = state => ({
  persistedPhoneNumber: state.licence.phoneNumber,
  token: state.licence.token,
})

export default connect(mapStateToProps, {licence})(SimClass)