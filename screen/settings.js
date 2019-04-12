import React, { Component } from 'react';

import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Toast  } from 'native-base';
import {StatusBar} from 'react-native'

import {NavigationActions} from 'react-navigation';

import {licence, cpLicence, subCpLicence, retailerLicence} from '../redux/action'
import {connect} from 'react-redux'


export  class  SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      showToast: false,
    };

  }

  componentDidMount(){
    if(this.props.token){
      this.setState({
        disable: true
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
                  if(this.props.token){
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
                if(this.props.token){
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
                <Icon active name="ios-analytics" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                if(this.props.cpToken){
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
                if(this.props.subCpToken){
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
                if(this.props.retailerToken){
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
              <Text>agent</Text>
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
              <Text onPress={()=>this.props.navigation.navigate('LicenceHome')}>Licence</Text>
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