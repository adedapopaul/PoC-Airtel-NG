import React, {Component} from 'react'
import {SectionList, TouchableOpacity, StyleSheet,View} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right ,  Text,} from 'native-base';
import Contacts from 'react-native-contacts';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux'
import {licence} from '../redux/action'
import {contactDetials} from '../redux/contact'

const styles = StyleSheet.create({
  row: {padding: 10},
})
const renderSectionHeader = ({section}) => <Text style={{ fontWeight: 'bold', paddingLeft: 20}}>{section.title}</Text>

export  class SectionListContactsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msidn:'',
      contacts: [],
      sections: [],
      phone: '',
      disable: true,
      errorText: '',
    };

  }



getContact= () =>{
  Contacts.getAll((err, contacts) => {
    if (err) {
      throw err;
    }
    this.setState({
      contacts: contacts
    },this.SectionListContacts(contacts))
    console.log(this.state.contacts)
   })
}

UNSAFE_componentWillMount(){
  this.getContact()
}




onSelectContact = () => {
  if(item.phoneNumbers[0].number === undefined  || item.phoneNumbers[0].number === null ){
      Toast.show({
      text: "Phone Number selected is empty",
      duration: 2000,
    })
  }else {
  this.props.contactDetials({phone: item.phoneNumbers[0].number})
  Toast.show({
    text: "Phone Number selected",
    duration: 1000,
  })
  this.props.navigation.goBack()
  }
}


SectionListContacts = props => {
  const contactsByLetter = props.reduce((obj, contact) => {

    const firstLetter = contact.givenName[0].toUpperCase()
    return {
      
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})
  // console.log(contactsByLetter)

  const sections = Object.keys(contactsByLetter)
    .sort()
    .map(letter => ({
      data: contactsByLetter[letter],
      title: letter,
    }))

  this.setState({ sections : sections})
  console.log(this.state.sections)

}


render() {
    return (
      <SectionList
        keyExtractor={item => item.recordID}
        sections={this.state.sections}
        renderItem={({item,index}) => (
            <TouchableOpacity key={index} style={styles.row} onPress={ async ()=>{
              if(item.phoneNumbers[0].number === undefined  || item.phoneNumbers[0].number === null ){
                  Toast.show({
                  text: "Phone Number selected is empty",
                  duration: 2000,
                })
              }
              else {
               await this.props.contactDetials({phone: item.phoneNumbers[0].number})
              Toast.show({
                text: "Phone Number selected",
                duration: 3000,
              })
              this.props.navigation.goBack()
              }
            }} >
              <Text >{`${item.givenName}  ${item.familyName}`}</Text>
            </TouchableOpacity>
          )}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
      />
    )
  }

}




const mapStateToProps = state => ({
  token: state.licence.token,
  contactDetial: state.cpContact.cpContact
})

export default connect(mapStateToProps, {contactDetials,licence})(SectionListContactsScreen)