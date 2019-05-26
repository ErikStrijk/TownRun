import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import Alert from './Components/Alert';

const fetchData = require('../fetchData');
const config = require('../config');

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    loading: false,
    alertTitle: "",
    message: "",
    cancelText: "",
    confirmText: "",
  }
    render() {
      const data = this.props.navigation.getParam('section');
      if (!this.state.loading) {
      return(
              <ImageBackground source={require('../assets/background.png')} style={{flex: 1}}>
              <View style={{flex: 1.3, padding: 15, borderBottomColor: '#F0B672', borderBottomWidth: 5}}>
                <Text style={styles.subtitle}>{data.ChallengeTitel.toUpperCase()}</Text>
                <Text style={styles.title}> INFORMATIE </Text>

              </View>
              <View style={{flex: 7, padding: 20}}>
                  <Text style={styles.text}> {data.Challenge.challenge} </Text>
              </View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <TouchableHighlight title="LOCATIE" onPress={this.sendDataToContinue.bind(this)} style={styles.button}>
                  <Text style={styles.buttonTitle}> GA DOOR </Text>
                </TouchableHighlight>
              </View>
              <Alert
              showAlert={this.state.showAlert}
              title={this.state.alertTitle}
              message={this.state.message}
              message={this.state.confirmText}
              onConfirmPressed={this.onConfirmPressed.bind(this)}
              />
            </ImageBackground>
      )
    }          
    return (
      <ImageBackground source={require('../assets/background.png')} style={{flex: 1, justifyContent: 'center'}}> 
        <ActivityIndicator size="large" color="#F0B672" />
      </ImageBackground>
    );       
    }

    sendDataToContinue() {
      AsyncStorage.getItem('LOGIN').then((value)=>{
        this.setState({loading: true})
        fetchData(config.url +  '/challenge', value).then((result) => {
          try {
            if(result.authentication) return this.props.navigation.navigate('ChoosingScreen');
            this.props.navigation.navigate('SignInScreen');
          } catch (error) {
            this.setState({loading: false})
            this.showAlert({title: "Server ligt plat...", confirmText: "Probeer het opnieuw."})
          }
        })
      });
  }
      
  showAlert(message) {
    this.setState({
      showAlert: true,
      alertTitle: message.title,
      confirmText: message.confirmText,
    })
  }
  onConfirmPressed() {
    this.setState({showAlert: false});
  }
}
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "montserrat",
    color: 'white',
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 40,
    fontFamily: "montserrat",
    color: 'white',
    textAlign: 'center'
  },
  text: {
    fontSize: 35,
    fontFamily: "montserrat",
    color: 'white',
    textAlign: 'center'
  },
  buttonTitle: {
    fontSize: 28,
    fontFamily: "montserrat",
    color: 'white',
  },
  button: {
    width: 250,
    height: 75,
    alignSelf: 'center'  ,
    backgroundColor: '#F0B672',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
  }
});