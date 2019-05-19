import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right } from 'native-base';
import { View, Text, StatusBar, Button} from 'react-native'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {vending} from '../redux/vendaction'
import {licence, cpLicence, subCpLicence, retailerLicence} from '../redux/action'
import {connect} from 'react-redux'
import {history} from '../redux/history'


var d= new Date()
var date= `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
export  class VendingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pin: '',
      quantity: '',
      msidn:'',
      disable: true,
      errorText: '',
      selected2: undefined,
      selectedSim: undefined,
    };

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

  componentDidMount(){
    if(this.props.variable){
      this.setState({
        msidn: this.props.variable.phone,
        pin: this.props.variable.pin,
        quantity: this.props.variable.quantity,
        selected2: this.props.variable.amount,
        selectedSim: this.props.variable.receiverSim,
      })
    }
  }


  _activate = async () => {
    // alert(this.state.selected2)
    if(+this.state.selected2){
      this.props.vending({amount : this.state.selected2, phone: this.state.msidn, quantity: this.state.quantity, receiverSim : this.state.selectedSim})
      Toast.show({
        text: "Vending variables is saved.",
        buttonText: "Okay",
        duration: 5000
      })
      var msg = `Vending Varriable Editted.\n     Date/Time: ${date}.`
      this.props.history(msg)
   }else{
      Toast.show({
        text: "Please select appropriate Denomination",
        // buttonText: "Okay",
        duration: 3000
      })
   }
  }


validateForm = () =>{
  if(process.env.NODE_ENV === 'development'){
    this.setState({ disable: false})
  }
  else if(this.state.quantity && this.state.msidn && this.state.selected2 && this.props.token && this.state.selectedSim && (this.props.cpToken || this.props.subCpToken  || this.props.retailerToken)){
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

_handlePin =old=>{
  if (old.length>=0 && old.length <= 5 ){
    this.setState({
      pin: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Please input valid Pin"
    })
  }
}

_handleQuantity =quantity=>{
  if (+quantity >=0  && quantity.length<= 7){
    this.setState({
      quantity,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Quantity can't be empty or more than 7 digits"
    })
  }
}


onValueChangeSim(value: string) {
    if (value){
      this.setState({
        selectedSim: value,
        errorText : ""
      }, this.validateForm)
    }else{
    this.setState({
        errorText : "Please select pin receiver option"
      })
    }

  }

onValueChange2(value: string) {
  if (value){
    this.setState({
      selected2: value,
      errorText : ""
    }, this.validateForm)
  }else{
  this.setState({
      errorText : "Amount must be a digits"
    })
  }

  }

  render() {
    return (
      <Container>
      < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Denomination"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Denomination" value="key0" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="100" value="100" />
                <Picker.Item label="200" value="200" />
                <Picker.Item label="500" value="500" />
                <Picker.Item label="1000" value="1000" />
                <Picker.Item label="5000" value="5000" />

              </Picker>
            </Item>


            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select MSISDN Receiver Option"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedSim}
                onValueChange={this.onValueChangeSim.bind(this)}
              >
                <Picker.Item label="Select MSISDN Receiver Option" value="key0" />
                <Picker.Item label="Send PIN to Self" value="1" />
                <Picker.Item label="Send PIN to other Number" value="2" />
              </Picker>
            </Item>

          <Item>
            <Icon active name='md-call' />
            <Input placeholder='MSISDN'
              keyboardType={'numeric'}
              onChangeText={this._handlePhoneNumber}
              value={this.state.msidn}
            /> 
          </Item>

          <Item>
            <Icon active name='md-code-working' />
            <Input placeholder='Quantity'
              keyboardType={'numeric'}
              onChangeText={this._handleQuantity}
              value={this.state.quantity}
            />
          </Item>

         

          <View style={{ paddingTop : 20 }}>
            <Button
              onPress={this._activate}
              title="Submit"
              color="#841584"
              accessibilityLabel="Save"
              disabled= {this.state.disable}
            />
            </View>

            <Text style={{paddingTop: 30}}>If you don't know this SIM card number, no worries.
              <Text style={{color : 'blue'}}
              onPress={()=> RNImmediatePhoneCall.immediatePhoneCall('*121*3*4#')}
              >
               Get SIM Card Number.
              </Text>
            </Text>
            <Text style={{paddingTop: 30, color : 'red'}}>Please Note.</Text>
            <Text>If you select "Send PIN to other Number" as your Receiver Option, you will no longer be able to use this mobile app to print the E-Pin generated thereof.</Text>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.licence.token,
  variable: state.vending.vending,
  cpToken: state.cpLicence.token,
  subCpToken: state.subCpLicence.token,
  retailerToken: state.retailerLicence.token,
  sections: state.history,
})

export default connect(mapStateToProps, {vending,licence, cpLicence, subCpLicence, retailerLicence, history})(VendingScreen)