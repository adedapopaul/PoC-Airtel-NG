import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Toast } from 'native-base';
import { View, Text, Button, StatusBar} from 'react-native'

import {accountAction} from '../redux/accountAction'
import {licence} from '../redux/action'
import {connect} from 'react-redux'
import {history} from '../redux/history'

var d= new Date()
var date= `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`

export class ManageAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      username: '',
      password: '',
      pin: '',
      companyName: '',
      disable: true,
      errorText: ''
    };

  }

componentDidMount(){
  if(this.props.account){
    this.setState({
      profile: this.props.account.profile,
      username: this.props.account.username,
      password: this.props.account.password,
      companyName: this.props.account.companyName,
      pin: this.props.account.pin
    })
  }
}

  _activate = async () => {
    this.props.accountAction({profile: this.state.profile, username: this.state.username, pin: this.state.pin, password: this.state.password, companyName: this.state.companyName})
    Toast.show({
      text: "Account Information saved successfully.",
      duration: 3000
    })
    var msg = `Account Info Editted.\n      Date/Time: ${date}.`
    this.props.history(msg)
  }


validateForm = () =>{
  if(this.state.password && this.state.profile && this.state.username && this.state.pin && this.state.companyName && this.props.token){
    this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
  }
}

_handleProfile =old=>{
  if (old.length>=0 && old.length <= 30 ){
    this.setState({
      profile: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Please input valid Name"
    })
  }
}

_handleCompany =old=>{
  if (old.length>=0 && old.length <= 30 ){
    this.setState({
      companyName: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Please input valid Name"
    })
  }
}

_handleUsername =old=>{
  if (old.length>=0 && old.length <= 20 ){
    this.setState({
      username: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Please input valid Username"
    })
  }
}

_handlePassword =old=>{
  if (old.length>=0 && old.length <= 15 ){
    this.setState({
      password: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Please input valid Password"
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


  render() {
    return (
      <Container>
      < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Item>
            <Icon active name='md-person' />
            <Input placeholder='Profile Name'
              onChangeText={this._handleProfile}
              value={this.state.profile}
            />
          </Item>

          <Item>
            <Icon active name='md-person-add' />
            <Input placeholder='Username'
              onChangeText={this._handleUsername}
              value={this.state.username}
            />
          </Item>

          <Item>
            <Icon active name='md-home' />
            <Input placeholder='Company Name'
              onChangeText={this._handleCompany}
              value={this.state.companyName}
            />
          </Item>


          <Item>
            <Icon active name='md-pint' />
            <Input placeholder='Password'
              onChangeText={this._handlePassword}
              value={this.state.password}
            />
          </Item>

          <Item>
            <Icon active name='md-pin' />
            <Input placeholder='ERC Pin'
              keyboardType={'numeric'}
              onChangeText={this._handlePin}
              value={this.state.pin}
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
  account: state.account.account,
  sections: state.history,
})

export default connect(mapStateToProps, {accountAction,licence, history})(ManageAccount)