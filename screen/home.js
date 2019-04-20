import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Toast, Left } from 'native-base';
import {SectionList, TouchableOpacity, StyleSheet,View, PermissionsAndroid, Platform} from 'react-native'
import {requestStoragePermission, requestStoragePermission2, requestContactPermission, requestContactPermission2, requestSmsPermission, requestSmsPermission2, requestCallPermission} from '../permissions'
import {connect} from 'react-redux'
import {licence, cpLicence, subCpLicence, retailerLicence} from '../redux/action'

export  class HomeScreen extends Component {

 componentDidMount = () => {
   //Checking for the permission just after component loaded
    
    if (Platform.OS === 'android') {
       requestSmsPermission()
    }else{
        alert('IOS device found');
    }
 }


  render() {
    return (
      <Container>
        <Content>
          <Card style={{ paddingTop:20}}>
            <CardItem>
                <Text style={{ }} >Welcome To ERC - Airtel NG</Text>
                
            </CardItem>
            <CardItem>
                <Icon active style={{ color: 'blue', fontSize: 30}} name="md-code-working" />
                <TouchableOpacity  onPress={()=> {
                  if(!this.props.token){ 
                    Toast.show({
                      text: 'Please activate your device',
                      duration: 3000,
                      type: 'warning'
                    })
                  } 
                  else{
                    if(!this.props.retailerToken){
                      Toast.show({
                        text: 'Please activate required licence for this feature.',
                        duration: 3000,
                        type: 'warning'
                      })
                    }
                    else{
                   this.props.navigation.navigate('GenerateEPin') }}} 
                }>
                  <Text>Generate E-Pin</Text>
                </TouchableOpacity>
                
             </CardItem>
             <CardItem>
              <Icon active style={{ color: 'orange', fontSize: 30}} name="md-paper" />
              <TouchableOpacity  onPress={()=>{
                if(!this.props.token){ 
                  Toast.show({
                    text: 'Please activate your device',
                    duration: 3000,
                    type: 'warning'
                  })
                } 
                else{
                  if(!this.props.retailerToken){
                      Toast.show({
                        text: 'Please activate required licence for this feature.',
                        duration: 3000,
                        type: 'warning'
                      })
                    }
                    else{
                 this.props.navigation.navigate('Print') }}} 
              }>
                <Text>Print</Text>
              </TouchableOpacity>
             </CardItem>
             <CardItem>
              <Icon active style={{ color: 'red', fontSize: 30}}  name="md-analytics" />
              <TouchableOpacity  onPress={()=>{ if(!this.props.cpToken){
                  Toast.show({
                    text: 'You are not a registered user.',
                    duration: 3000,
                    type: "danger",
                  })
                } 
                else{ this.props.navigation.navigate('CPHome') }}} 
              >
              <Text>Channel Partner</Text>
              </TouchableOpacity>
             </CardItem>
             <CardItem>
              <Icon active style={{ color: 'pink', fontSize: 30}}  name="md-person" />
              <TouchableOpacity  onPress={()=> { if(!this.props.subCpToken){
                  Toast.show({
                    text: 'You are not a registered user.',
                    duration: 3000,
                    type: "warning",
                  })
                } 
                else{ this.props.navigation.navigate('SubCPHome') }}} >
              <Text>Sub Channel Partner</Text>
              </TouchableOpacity>
             </CardItem>
             <CardItem>
              <Icon active name="md-flame" />
              <TouchableOpacity  onPress={()=>{ if(!this.props.retailerToken){
                  Toast.show({
                    text: 'You are not a registered user.',
                    duration: 3000,
                  })
                } 
                else{ this.props.navigation.navigate('RetailerHome') }}} >
                <Text>Retailer</Text>
              </TouchableOpacity>
             </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.licence.token,
  cpToken: state.cpLicence.token,
  subCpToken: state.subCpLicence.token,
  retailerToken: state.retailerLicence.token,
})

export default connect(mapStateToProps, {licence, cpLicence, subCpLicence, retailerLicence})(HomeScreen)