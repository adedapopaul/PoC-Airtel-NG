import React,{Component} from 'react';
// import Navigator from './route/route';
import SmsAndroid  from 'react-native-get-sms-android';
import { Platform, StyleSheet, Text, View,   ScrollView,
        TouchableOpacity,TextInput,KeyboardAvoidingView,Button,Image,ImageBackground,
       StatusBar,DeviceEventEmitter} from 'react-native';
       
import { ProgressDialog } from 'react-native-simple-dialogs';
import SmsListener from 'react-native-android-sms-listener'


var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    address: '***********', // sender's phone number
    // the next 2 filters can be used for pagination
    indexFrom: -1, // start from index 0
    maxCount: 2, // count of SMS to return each time
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      amount: '',
      password: '',
      quantity: '',
      disable: true
    }


      sendSMSNow = (sent, num, count)=>{
        if(sent === false ){
          let hold = this.state
          let message= `****************************`
          let senderId = '*********'
          // let count =1 
          if( count <= num ){
            openProgress() 
            SmsAndroid.autoSend(senderId, message, (fail) => {
                alert("Failed with this error: " + fail)
            }, (success)=> console.log(success))
            // count++
            listenSMSNow(true, num, count)
          }else{
            alert("Finished")
          }
          
         // return sent = true
        }
       
      }

      listenSMSNow= ( sent, num, count) =>{
        // alert("welcome")
        if(sent === true){
          // alert( 'welcome 2')
          // let count = count
          sendSMSNow( true, num, count)
          // setTimeout(()=>{
              let subscription = SmsListener.addListener(message => {
              let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
              let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/

                if (transactionIdRegex.test(message.body)) {
                    sendSMSNow(true, num, count) 
                    // delete the message
                    
                }
                if (verificationCodeRegex.test(message.body)) {
                    // alert(verificationCodeRegex)
                    subscription.remove();
                    count++
                    sendSMSNow(false, num, count) 
                }
                else{
                  alert("Error:  " + message.body)
                  sendSMSNow(true, num, count)

                }
              }) 
          // }, 5*60*1000)
        }
        
      }
     openProgress = () => {
            this.setState({ showProgress: true });

            setTimeout(
                () => {
                    this.setState({ showProgress: false });
                },
                4000,
            );
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
    this.setState({ disable: false})
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

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
            </View>
        )
    }
}


