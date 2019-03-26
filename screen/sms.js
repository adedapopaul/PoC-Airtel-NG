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
    address: 'AirtelERC', // sender's phone number
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
    };

      sendSMSNow = (sent, num, count)=>{
        if(sent === false ){
          let hold = this.state
          let message= `xx ${hold.phoneNumber} xx 1 ${hold.password}`
          let senderId = 'xx'
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
              let verificationCodeRegex = /Msg:ERC/

                if (verificationCodeRegex.test(message.body)) {
                    // alert(verificationCodeRegex)
                    subscription.remove();
                    count++
                    sendSMSNow(false, num, count) 
                }
                else{
                  alert("Network Error:  " + message.body)
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

  


 _onProcessTextChange = (currentText, min, max) =>{
        if(!currentText){
          this.setState({
            errorText: "Field can't be empty"
          })
        }  else if(currentText.length < min && currentText.length > max  ){
          this.setState({
            errorText: 'Min length is `${min}` and Max is `${max}`'
          })
        }
        else{
          this.setState({
            errorText: '',
            disable: false
          })
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



    render(){
        return(
          <View style= {{ flex: 1, flexDirection: 'column',paddingTop: 30, padding:10}}>
           <KeyboardAvoidingView  behavior="padding" enabled>
        <View style={{}}>
          <ScrollView  >
          <Text style={{color: 'blue'}} > {this.state.errorText} </Text>
          <Text style={{fontWeight: 'bold'}}> Phone Number </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={(phoneNumber) => {
                    this._onProcessTextChange(phoneNumber, 9, 15)
                    this.setState({phoneNumber})
                  }}
              value={this.state.phoneNumber}
            />
            <Text style={{fontWeight: 'bold'}}> Amount </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={(amount) => {
                    this._onProcessTextChange(amount, 2, 4);
                    this.setState({amount})
                  }}
              value={this.state.amount}
            />

            <Text style={{fontWeight: 'bold'}}> Password </Text>
             <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={(password) => {
                    this._onProcessTextChange(password,1, 6);
                    this.setState({password})
                  }}
              value={this.state.password}
            />
            <Text style={{fontWeight: 'bold',}}> Quantity </Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, color: "black", padding: 10}}
              keyboardType={'numeric'}
              onChangeText={(quantity) => {
                    this._onProcessTextChange(quantity, 1, 3);
                    this.setState({quantity})
                  }}
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


