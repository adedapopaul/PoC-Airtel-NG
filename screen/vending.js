import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right } from 'native-base';
import { View, Text, StatusBar, Button} from 'react-native'

import {vending} from '../redux/vendaction'
import {licence} from '../redux/action'
import {connect} from 'react-redux'

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
        selected2: this.props.variable.amount
      })
    }
  }


  _activate = async () => {
    // alert(this.state.selected2)
    if(+this.state.selected2){
      this.props.vending({amount : this.state.selected2, phone: this.state.msidn, quantity: this.state.quantity})
      Toast.show({
        text: "Vending variables is saved.",
        buttonText: "Okay",
        duration: 5000
      })
   }else{
      Toast.show({
        text: "Please select appropriate Denomination",
        // buttonText: "Okay",
        duration: 3000
      })
   }
  }


validateForm = () =>{
  if(this.state.quantity && this.state.msidn && this.state.selected2 && this.props.token){
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

          <Item>
            <Icon active name='md-call' />
            <Input placeholder='MSISDN'
              keyboardType={'numeric'}
              onChangeText={this._handlePhoneNumber}
              value={this.state.msidn}
            /> 
            <Right>
            <Icon active name="md-person-add" style={{ backgroundColor: "green", }} />
            </Right>
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

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.licence.token,
  variable: state.vending.vending,
})

export default connect(mapStateToProps, {vending,licence})(VendingScreen)