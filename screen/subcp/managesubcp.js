import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Picker, Toast } from 'native-base';
import { View, Text, Button} from 'react-native'

import {subCpAccountAction} from '../../redux/accountAction'
import {licence} from '../../redux/action'
import {connect} from 'react-redux'

export class ManageSubCPAccountScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pin: '',
      disable: true,
      errorText: '',
      selected2: undefined,
    };

  }

  componentDidMount(){
    if(this.props.subCpAccount){
      this.setState({pin: this.props.subCpAccount.pin, selected2: this.props.subCpAccount.sim})
    }
  }


  _activate = async () => {
    this.props.subCpAccountAction({pin: this.state.pin, sim: this.state.selected2})
    Toast.show({
      text: "Account Information Successfully saved.",
      duration: 5000,
    })
  }


validateForm = () =>{
  if(this.state.pin && this.props.token){
    this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
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


onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>
          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Default SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="SIM 1" value="key0" />
                <Picker.Item label="SIM 2" value="key1" />
              </Picker>
            </Item>

          <Item>
            <Icon active name='md-pin' />
            <Input placeholder='CP ERC Pin'
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
  subCpAccount: state.subCpAccount.subCpAccount,
})

export default connect(mapStateToProps, {subCpAccountAction,licence})(ManageSubCPAccountScreen)