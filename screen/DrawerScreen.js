import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView,  View} from 'react-native';

import { Image, Container, Header, Text,Content, List, ListItem, Icon, Left, Body, Right, 
  Switch, Button, Card, CardItem, Toast, } from 'native-base';

import { DrawerActions } from 'react-navigation';
// import SendIntentAndroid from 'react-native-send-intent'
import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid  from 'react-native-get-sms-android';

import styles from '../styles/styles';

import {connect} from 'react-redux'
import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';
import {licence, cpLicence, subCpLicence, retailerLicence} from '../redux/action'
import {accountAction} from '../redux/accountAction'

export class DrawerScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      message: '',
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

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }


  checkBalance = ()=> {
    let pin = this.props.accountPin.pin
    let message = `BAL ${pin}`
    SmsAndroid.autoSend('433',message , (fail) => {
      alert("Failed with this error: " + fail)
    }, (success)=> console.log(success))
   
    Toast.show({
      text: "Request Sent. Processsing... ",
      buttonText: 'Okay',
      duration: 5000,

    })
    let subscription = SmsListener.addListener(message => {
            // let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
            // let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/

            //   if (transactionIdRegex.test(message.body)) {
            //       sendSMSNow(true, num, count) 
            //   }
            //   else if (transactionIdRegex.test(message.body)) {
            //       subscription.remove();
            //       count++
            //       sendSMSNow(false, num, count) 
            //   }
            //   else{
            //     const stopSending = setTimeout(()=>{
            //       return true
            //     }, 5*1000)
            //     if(stopSending){
            //       alert("Network Error:  " +'\nPlease Restart Process.' )
            //       sendSMSNow(true, num, count)
            //       KeepAwake.deactivate();
            //     }
                
            //   }

            this.setState({ message : message.body, dialogVisible: true,})
            subscription.remove();
          })

  }

  render () {
    return (
          <Container>

          <Card>
            <CardItem>
              <Left>
                < Icon name='md-person' />
                <Body>
                  <Text>Welcome</Text>
                  <Text note>{this.props.phoneNumber}</Text>
                </Body>
              </Left>
            </CardItem>
            

          </Card>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="home" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.navigateToScreen('Home')}>Home</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon active name="md-cog" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.navigateToScreen('Settings')}>Settings</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#DDA0DD" }}>
                <Icon active name="md-cart" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                  if(this.props.token){
                    if(!this.props.retailerToken){
                      Toast.show({
                        text: "Please activate required licence for this feature.",
                        buttonText: "Okay",
                        duration: 3000,
                        type: 'warning'
                      })
                    }
                    else{
                      this.props.navigation.navigate('VendingVariable')
                    }
                  }
                  else{
                    Toast.show({
                      text: "Device is not licenced. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 3000
                    })
                  }
                }
              }>Manage Vending Variable</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#008080" }}>
                <Icon active name="md-briefcase" />
              </Button>
            </Left>
            <Body>
              <Text onPress={()=>{
                  if(this.props.token){
                    this.checkBalance()
                  }
                  else{
                    Toast.show({
                      text: "Device is not licenced. Please contact developer to obtain licence",
                      buttonText: "Okay",
                      duration: 3000
                    })
                  }
                }
              }>Check Balance</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#4682B4" }}>
                <Icon active name="md-contract" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.navigateToScreen('About')}>About</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#DA70D6" }}>
                <Icon active name="md-contact" />
              </Button>
            </Left>
            <Body>
              <Text onPress={this.navigateToScreen('Contact')}>Contact</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <Dialog
            visible={this.state.dialogVisible}
            title="Message"
            onTouchOutside={() => this.setState({dialogVisible: false})} 
            onRequestClose = {() => this.setState({dialogVisible: false})}
          >
            <Text style={{ fontSize: 16, paddingBottom: 14 }}>
              {this.state.message} 
            </Text>

            <Button block onPress={() => this.setState({dialogVisible: false})}>
              <Text>Close</Text>
            </Button>
          </Dialog>

    </Container>
      
    );
  }
}


const mapStateToProps = state => ({
  phoneNumber: state.licence.phoneNumber,
  token: state.licence.token,
  account: state.vending,
  accountPin: state.account.account,
  cpToken: state.cpLicence.token,
  subCpToken: state.subCpLicence.token,
  retailerToken: state.retailerLicence.token,
})

export default connect(mapStateToProps, {licence,accountAction, cpLicence, subCpLicence, retailerLicence})(DrawerScreen)