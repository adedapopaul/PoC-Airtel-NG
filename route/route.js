import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import Home from '../screen/sms';
import About from '../screen/about';
import Contact from '../screen/contact';
import DrawerScreen from '../screen/DrawerScreen';
// import Request from '../screen/request';
import Licence from '../screen/licence';
// import Settings from '../screen/settings';

const Tabs = createMaterialTopTabNavigator({
    Home: Home,
    About: About,
    Contact: Contact
},{
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});



class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../images/menu-button2.png')}
            style={{ width: 30, height: 30, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// const requestStackNavigator = createStackNavigator({
//   Request: {
//     screen: Request,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Request Licence Key',
//       headerStyle: {
//         backgroundColor: '#ccc',
//       },
//       headerTintColor: '#000',
//     }),
//   },
// });


const licenceStackNavigator = createStackNavigator({
  Licence: {
    screen: Licence,
    navigationOptions: ({ navigation }) => ({
      title: 'Licence',
      headerStyle: {
        backgroundColor: '#ccc',
      },
      headerTintColor: '#000',
    }),
  },
});

// const settingsStackNavigator = createStackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Settings',
//       headerStyle: {
//         backgroundColor: '#ccc',
//       },
//       headerTintColor: '#000',
//     }),
//   },
// });


const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Tabs
    },
    Licence: {
        screen: licenceStackNavigator
    }
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});



const StackNavigator = createStackNavigator({
    
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    
    DrawerNavigator:{
        screen: DrawerNavigator,
         navigationOptions: ({ navigation }) => ({
        title: 'PoC - Airtel NG SMS',  // Title to appear in status bar
        headerLeft: 
        <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <Image
            source={require('../images/menu-button.png')}
            style={{ width: 30, height: 30, marginLeft: 8 }}
          />
        </TouchableOpacity>,
        headerStyle: {
            backgroundColor: '#333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    }, 
});


const AppContainer = createAppContainer(StackNavigator);
export default AppContainer;
