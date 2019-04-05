import React,{Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Loader from 'react-native-mask-loader';

export default class App extends React.Component<{}, State> {
  state = {
    appReady: false,
    rootKey: Math.random(),
  };

constructor() {
    super();

    this._image = require('../images/poc.png');

    setTimeout(()=>{
        this.setState({
			appReady: true,
		})
    }, 1000)
  }


  render() {
    return (
      <View key={this.state.rootKey} style={styles.root}>
        <Loader
          isLoaded={this.state.appReady}
          imageSource={this._image}
          backgroundStyle={styles.loadingBackgroundStyle}
        >

        </Loader>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingBackgroundStyle: {
    backgroundColor: 'rgba(125, 125, 255, 1)',
  },
});