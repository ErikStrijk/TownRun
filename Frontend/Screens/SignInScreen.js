import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

const fetchData = require('../fetchData');
const config = require('../config');
                                
export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    username: null,
    password: null
  }
    render() {
      return(
<KeyboardAvoidingView style={StyleSheet.absoluteFillObject} behavior="padding" enabled>
      <ImageBackground onLayout={(event) => {var {height} = event.nativeEvent.layout; this.setState({height})}}
    source={require('../assets/background.png')}style={styles.container}>
        <Text style={styles.title}> 4X4 ROB </Text>
        <TextInput placeholderTextColor="white" style={styles.input} placeholder="USERNAME" 
                           onChangeText={(text) => this.setState({username: text})}
                           value={this.state.username}/>
        <TextInput placeholderTextColor="white" style={styles.input} placeholder="PASSWORD"
                   onChangeText={(text) => this.setState({password: text})}
                   value={this.state.password}/>
        <TouchableHighlight onPress={this.validateLogin.bind(this) }title="Login" style={styles.button}>
          <Text style={styles.buttonTitle}> LOGIN </Text>
        </TouchableHighlight>
      </ImageBackground></KeyboardAvoidingView>)
    }
    async validateLogin() {
      fetchData(config.url +  '/validateLogin', JSON.stringify({username: this.state.username, password: this.state.password})).then((result) => {
        if(result != {} || result != null) {
            if(result.authentication) {
              AsyncStorage.setItem('LOGIN', JSON.stringify(this.state));
              this.props.navigation.navigate('ChoosingScreen');
            } else {
            }
          } 
        });
    }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1
  },
  title: {
    fontSize: 45,
    margin: 15,
    fontFamily: "montserrat",
    color: 'white',

  },
  buttonTitle: {
    fontSize: 36,
    fontFamily: "montserrat",
    color: 'white',

  },
  input: {
    fontSize: 30,
    fontFamily: "Hind",
    color: 'white',
    borderColor: '#F0B672',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: Dimensions.get('window').width * 0.75,
    borderWidth: 5,
    margin: 20
  },
  button: {
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.17,


    backgroundColor: '#F0B672',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80
  }
});