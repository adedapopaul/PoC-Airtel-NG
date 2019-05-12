import React, {Component} from 'react'
import {SectionList, TouchableOpacity, StyleSheet,View} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right ,  Text,} from 'native-base';
import Contacts from 'react-native-contacts';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux'
import {licence} from '../redux/action'
import {history} from '../redux/history'
import {contactDetials} from '../redux/contact'

const styles = StyleSheet.create({
  row: {padding: 10},
})

var value= []
var historyData = [{ data: value}]
export  class SectionListContactsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: true,
      errorText: '',
      sections: []
    };

  }

  componentDidMount(){
    var value= []
    var historyData = [{ data: value}]
    this.props.sections.forEach((msg)=> {
      value.push(msg)
    })
    this.setState({ sections : historyData})
    // console.warn(this.state.sections)
  }

  render() {
    return(
      <SectionList
        renderItem={({item, index, section}) => <Text style={{marginLeft: 15, paddingTop: 5, paddingBottom: 5}} key={index}><Text style={{fontWeight: 'bold'}}>{index + 1}.</Text> {item}</Text>}
        
        sections={this.state.sections}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}


const mapStateToProps = state => ({
  token: state.licence.token,
  sections: state.history,
})

export default connect(mapStateToProps, {contactDetials,licence, history})(SectionListContactsScreen)