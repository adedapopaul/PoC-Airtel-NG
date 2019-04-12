import React, { Component } from "react";
import { Container, Header, Button, Content, ActionSheet, Text } from "native-base";
var BUTTONS = [
  { text: "Device Licence", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Channel Partner Licence", icon: "analytics", iconColor: "#f42ced" },
  { text: "Sub CP Licence", icon: "aperture", iconColor: "#ea943b" },
  { text: "Retailer Licence", icon: "aperture", iconColor: "#ea943b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class LicenceHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Content padder>
        <Text style={{ paddingBottom: 8}} > Kindly select your licence option. Activation of device require an Internet access. Please ensure your device is connected to the internet.</Text>
          <Button block primary
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
          >
            <Text>Activate</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

