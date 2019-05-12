import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Toast } from 'native-base';
import { View, Text, Button, StatusBar} from 'react-native'
import Contacts from 'react-native-contacts';
import {licence} from '../redux/action'
import {connect} from 'react-redux'

const newPerson = {
  emailAddresses: [{
    label: "work",
  }],
  phoneNumbers: [{
    label: "mobile",
  }],
}
export class SaveDetailScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      disable: true,
      errorText: ''
    };

    

  }

componentDidMount(){
  
}

componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.state.email !== prevProps.email || this.state.phone !== prevProps.phone || this.state.lastName !== prevProps.lastName || this.state.firstName !== prevProps.firstName) {
    newPerson.givenName = this.state.firstName
    newPerson.familyName = this.state.lastName
     newPerson.emailAddresses[0].email = this.state.email
     newPerson.phoneNumbers[0].number = this.state.phone
  }
}


  _activate = async () => {
    Contacts.addContact(newPerson, (err) => {
      if (err) throw err;
      // save successful
      Toast.show({
        text: " Contact saved successfully",
        duration: 3000
      })
    })
  }
    


validateForm = () =>{
  if(process.env.NODE_ENV === 'development'){
    this.setState({ disable: false})
  }
  else if(this.state.phone && this.state.firstName && this.state.lastName && this.state.email && this.props.token){
    this.setState({ 
      disable: false,
    })
  }else{
    this.setState({ disable: true})
  }
}

_handleFirstName =old=>{
  if (old.length>=0 && old.length <= 15 ){
    this.setState({
      firstName: old,
      errorText : "",
      }, this.validateForm)
    
  }else{
    this.setState({
      errorText : "Please input valid Name"
    })
  }
}

_handleLastName =old=>{
  if (old.length>=0 && old.length <= 15 ){
    this.setState({
      lastName: old,
      errorText : ""
      }, this.validateForm)
    
  }else{
    this.setState({
      errorText : "Please input valid Name"
    })
  }
}

_handleEmail =old=>{
  if (old.length>=0 && old.length <= 40 ){
    this.setState({
      email: old,
      errorText : ""
      }, this.validateForm)
   
  }else{
    this.setState({
      errorText : "Please input valid Email"
    })
  }
}


_handlePhone =old=>{
  if (old.length>=0 && old.length <= 11 ){
    this.setState({
      phone: old,
      errorText : ""
      }, this.validateForm)
    
  }else{
    this.setState({
      errorText : "Please input valid Phone Number"
    })
  }
}


  render() {
    return (
      <Container>
      < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Item>
            <Icon active name='md-person' />
            <Input placeholder='First Name'
              onChangeText={this._handleFirstName}
              value={this.state.firstName}
            />
          </Item>

          <Item>
            <Icon active name='md-person' />
            <Input placeholder='Last name'
              onChangeText={this._handleLastName}
              value={this.state.lastName}
            />
          </Item>

          <Item>
            <Icon active name='logo-yahoo' />
            <Input placeholder='Email'
              onChangeText={this._handleEmail}
              value={this.state.email}
            />
          </Item>

          <Item>
            <Icon active name='md-call' />
            <Input placeholder='Phone Number'
              keyboardType={'numeric'}
              onChangeText={this._handlePhone}
              value={this.state.phone}
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
})

export default connect(mapStateToProps, {licence})(SaveDetailScreen)