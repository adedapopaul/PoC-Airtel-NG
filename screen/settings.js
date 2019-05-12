import React, { Component } from 'react';

import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Toast, ActionSheet  } from 'native-base';
import {StatusBar} from 'react-native'

import {NavigationActions} from 'react-navigation';

import {licence, cpLicence, subCpLicence, retailerLicence} from '../redux/action'
import {connect} from 'react-redux'

var BUTTONS = [
  { text: "Device Licence", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Channel Partner Licence", icon: "analytics", iconColor: "#f42ced" },
  { text: "Sub CP Licence", icon: "aperture", iconColor: "#ea943b" },
  { text: "Retailer Licence", icon: "aperture", iconColor: "#ea943b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export  class  SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      showToast: false,
      isOn: 'Off'
    };

  }

  componentDidMount(){
    if(this.props.token){
      this.setState({
        disable: true,
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

  render() {
    return (
      <Container>
      < StatusBar barStyle= 'dark-content' hidden={ true } backgroundcolor= '#000080' networkActivityIndicatorVisible = {true} />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Activation Status</Text>
            </Body>
            <Right>
              <Text>{this.state.isOn}</Text>
              <Switch value={this.state.disable} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{backgroundColor: "#007AFF" }}>
                <Icon active name="ios-barcode" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                if(process.env.NODE_ENV === 'development'){
                  this.props.navigation.navigate('manageAccount')
                }
                 else if(this.props.token){
                    this.props.navigation.navigate('manageAccount')
                  }
                  else{
                    Toast.show({
                      text: "Device is not licenced. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 3000
                    })
                  }
                }
              }>Manage Account</Text>
            </Body>
            <Right>
              <Text>Generic</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon active name="md-pin" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                if(process.env.NODE_ENV === 'development'){
                  this.props.navigation.navigate('ChangePin')
                }
                else if(this.props.token){
                    this.props.navigation.navigate('ChangePin')
                  }
                  else{
                    Toast.show({
                      text: "Device is not licenced. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 5000
                    })
                  }
                }
              }>Change Pin</Text>
            </Body>
            <Right>
            <Text>ERC</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#00BFFF" }}>
                <Icon active name="md-person" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                if(process.env.NODE_ENV === 'development'){
                  this.props.navigation.navigate('CPHome')
                }
                else if(this.props.cpToken){
                    this.props.navigation.navigate('CPHome')
                  }
                  else{
                    Toast.show({
                      text: "CP Account is not Licence. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 3000,
                      type: 'danger'
                    })
                  }
                }
              }>Channel Partner</Text>
            </Body>
            <Right>
              <Text>CP</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#008080" }}>
                <Icon active name="md-person" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                if(process.env.NODE_ENV === 'development'){
                  this.props.navigation.navigate('SubCPHome')
                }
                else if(this.props.subCpToken){
                    this.props.navigation.navigate('SubCPHome')
                  }
                  else{
                    Toast.show({
                      text: "Sub CP Account is not Licence. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 3000,
                      type: 'warning'
                    })
                  }
                }
              }>Sub Channel Partner</Text>
            </Body>
            <Right>
              <Text>Sub CP</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#4682B4" }}>
                <Icon active name="md-person" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                if(process.env.NODE_ENV === 'development'){
                  this.props.navigation.navigate('RetailerHome')
                }
                else if(this.props.retailerToken){
                    this.props.navigation.navigate('RetailerHome')
                  }
                  else{
                    Toast.show({
                      text: "Retailer Account is not Licence. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 3000,
                      type: 'danger'
                    })
                  }
                }
              }>Retailer</Text>
            </Body>
            <Right>
              <Text>Agent</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#800080" }}>
                <Icon active name="md-cog" />
              </Button>
            </Left>
            <Body>
              <Text 
                onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Select Your Licence Option"
                      },
                      buttonIndex => {
                        this.setState({ clicked: BUTTONS[buttonIndex] });
                        if(BUTTONS[buttonIndex].text === "Device Licence"){
                          this.props.navigation.navigate('Licence')
                        }
                        else if(BUTTONS[buttonIndex].text === "Channel Partner Licence"){
                          this.props.navigation.navigate('CPLicence')
                        }
                        else if(BUTTONS[buttonIndex].text === "Sub CP Licence"){
                          this.props.navigation.navigate('SubCPLicence')
                        }
                        else if(BUTTONS[buttonIndex].text === "Retailer Licence"){
                          this.props.navigation.navigate('RetailerLicence')
                        }
                      },

                    )}
              >Licence</Text>
            </Body>
            <Right>
              <Text>Generic</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  token: state.licence.token,
  cptoken: state.licence.cptoken,
  activationMessage : state.licence.activationMessage,
  cpToken: state.cpLicence.token,
  subCpToken: state.subCpLicence.token,
  retailerToken: state.retailerLicence.token,
})

export default connect(mapStateToProps, {licence, cpLicence, subCpLicence, retailerLicence})(SettingsScreen)