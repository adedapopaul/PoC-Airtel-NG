import React, { Component } from 'react';
import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';

import Home from '../screen/sms';
import About from '../screen/about';
import Contact from '../screen/contact';
import DrawerScreen from '../screen/DrawerScreen';
import DisplayContact from '../screen/displayContact';
import SaveContact from '../screen/saveContact';
import SubCpSaveContact from '../screen/subcp/subCpSaveContact';
import RetailerSaveContact from '../screen/retailer/retailerSaveContact';
// import Request from '../screen/request';
import Licence from '../screen/licence';
import Settings from '../screen/settings';
import GenerateEPin from '../screen/retailer/generateEpin';


import CPLicence from '../screen/cp/cplicence';
import CPHome from '../screen/cp/cphome';
import ManageCP from '../screen/cp/managecp';
import CPAgentBalance from '../screen/cp/agentBalance';
import CPStockTransfer from '../screen/cp/stockTransfer';
import RechargeCustomer from '../screen/cp/rechargeCustomer';

import SubCPLicence from '../screen/subcp/subCpLicence';
import SubCPHome from '../screen/subcp/subCpHome';
import ManageSubCP from '../screen/subcp/managesubcp';
import SubCpRechargeCustomer from '../screen/subcp/rechargeCustomer';
import SubCpStockTransfer from '../screen/subcp/stockTransfer';
import SubCpAgentBalance from '../screen/subcp/agentBalance';

import RetailerLicence from '../screen/retailer/retailerlicence';
import RetailerHome from '../screen/retailer/retailerhome';
import RetailerRechargeCustomer from '../screen/retailer/rechargeCustomer';

import ChangePin from '../screen/changepin';
import manageAccount from '../screen/manageAccount';


import VendingVariable from '../screen/vending';

const Tabs = createMaterialTopTabNavigator({
    Home: Home,
    Settings: Settings,
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

const aboutStackNavigator = createStackNavigator({
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      title: 'About',
      headerStyle: {
        backgroundColor: '#ccc',
      },
      headerTintColor: '#000',
    }),
  },
});

const contactStackNavigator = createStackNavigator({
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      title: 'Contact',
      headerStyle: {
        backgroundColor: '#ccc',
      },
      headerTintColor: '#000',
    }),
  },
});



const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Tabs
    },
    Licence: {
        screen: licenceStackNavigator
    },
    About: {
        screen: aboutStackNavigator
    },
    Contact: {
        screen: contactStackNavigator
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
        title: 'ERC- Airtel NG',  // Title to appear in status bar
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
    manageAccount: {
      screen: manageAccount,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Account',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      })
    },
    CPLicence: {
      screen: CPLicence,
      navigationOptions: ({ navigation }) => ({
        title: 'Channel Partner Licence',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    CPHome: {
      screen: CPHome,
      navigationOptions: ({ navigation }) => ({
        title: 'Airtel Channel Partner',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    CPAgentBalance: {
      screen: CPAgentBalance,
      navigationOptions: ({ navigation }) => ({
        title: 'Check Agent/Retailer Balance',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    CPStockTransfer: {
      screen: CPStockTransfer,
      navigationOptions: ({ navigation }) => ({
        title: 'Stock Transfer',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    RechargeCustomer: {
      screen: RechargeCustomer,
      navigationOptions: ({ navigation }) => ({
        title: 'Recharge Customer',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    ManageCP: {
      screen: ManageCP,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage CP Account',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    SubCPHome: {
      screen: SubCPHome,
      navigationOptions: ({ navigation }) => ({
        title: 'Airtel Sub Channel Partner',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    SubCPLicence: {
      screen: SubCPLicence,
      navigationOptions: ({ navigation }) => ({
        title: 'Sub Channel Partner Licence',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    SubCpRechargeCustomer: {
      screen: SubCpRechargeCustomer,
      navigationOptions: ({ navigation }) => ({
        title: 'Recharge Customer',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    SubCpStockTransfer: {
      screen: SubCpStockTransfer,
      navigationOptions: ({ navigation }) => ({
        title: 'Stock Transfer',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    SubCpAgentBalance: {
      screen: SubCpAgentBalance,
      navigationOptions: ({ navigation }) => ({
        title: 'Check Agent/Retailer Balance',  
        headerStyle: {
            backgroundColor: '#4169E1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    ManageSubCP: {
      screen: ManageSubCP,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Sub CP Account',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    ChangePin: {
      screen: ChangePin,
      navigationOptions: ({ navigation }) => ({
        title: 'Change Airtel ERC Pin',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    RetailerHome: {
      screen: RetailerHome,
      navigationOptions: ({ navigation }) => ({
        title: 'Airtel Retailer',  
        headerStyle: {
            backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    RetailerLicence: {
      screen: RetailerLicence,
      navigationOptions: ({ navigation }) => ({
        title: 'Retailer Licence',  
        headerStyle: {
            backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    RetailerRechargeCustomer: {
      screen: RetailerRechargeCustomer,
      navigationOptions: ({ navigation }) => ({
        title: 'Recharge Customer',  
        headerStyle: {
            backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    VendingVariable: {
      screen: VendingVariable,
      navigationOptions: ({ navigation }) => ({
        title: 'Manage Vending',  
        headerStyle: {
            backgroundColor: '#000080',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    GenerateEPin: {
      screen: GenerateEPin,
      navigationOptions: ({ navigation }) => ({
        title: 'Generate E-Pin',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    DisplayContact: {
      screen: DisplayContact,
      navigationOptions: ({ navigation }) => ({
        title: 'Contact',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    SaveContact: {
      screen: SaveContact,
      navigationOptions: ({ navigation }) => ({
        title: 'Save Contact',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },

    SubCpSaveContact: {
      screen: SubCpSaveContact,
      navigationOptions: ({ navigation }) => ({
        title: 'Save Contact',  
        headerStyle: {
            backgroundColor: '#483D8B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

    })
    },
    RetailerSaveContact: {
      screen: RetailerSaveContact,
      navigationOptions: ({ navigation }) => ({
        title: 'Save Contact',  
        headerStyle: {
            backgroundColor: '#483D8B',
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
