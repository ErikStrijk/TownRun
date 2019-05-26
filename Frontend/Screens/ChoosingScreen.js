import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Alert from './Components/Alert';

const config = require('../config');

const fetchData = require('../fetchData');
export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    showAlert: false,
    alertTitle: "",
    message: "",
    cancelText: "",
    confirmText: "",
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.goToRightScreen();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
    render() {

      return (      <ImageBackground source={require('../assets/background.png')} style={styles.container}> 

      <Text style={styles.title}> LADEN </Text>
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

    goToRightScreen() {
      AsyncStorage.getItem('LOGIN').then((value) => {
        fetchData(config.url +  '/getCurrentData', value).then((result) => {
          try {
          if(!result.authentication) this.props.navigation.navigate('SignInScreen');
          if(result.finished) this.props.navigation.navigate('FinishedScreen');
            
          if(result.section.SectionId == 1) {
            this.props.navigation.navigate('LocationScreen', {section: result.section});
          } else {
            if(result.section.Challenge.type == "information") {
              this.props.navigation.navigate('ChallengeInformationScreen', {section: result.section});
            } else if(result.section.Challenge.type == "photo") {
              this.props.navigation.navigate('ChallengeWithPhoto', {section: result.section});
            } else {
              this.showAlert({title: "Server geeft verkeerde informatie...", confirmText: "Probeer het opnieuw."});
            }
          }
        } catch (error) {
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
      this.goToRightScreen();
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
    fontSize: 20,
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
    marginBottom: 40,
    backgroundColor: '#F0B672',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80
  }
});