import React from 'react';
import { View, Text, Image } from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        
        <Image
            source={require('../images/airtel.jpg')}
            style={{ width: 200, height: 50 ,  padding: 50}}
        />
        <Text style={styles.textStyles}>
          ERC Generator
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  textStyles: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default SplashScreen;