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
  ActivityIndicator,
} from 'react-native';
import { ImagePicker, Permissions} from "expo";
import Alert from './Components/Alert';

const fetchData = require('../fetchFormData');
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
      const { navigation } = this.props;
      const data = navigation.getParam('section');
      if (!this.state.loading) {

      return(
        <ImageBackground source={require('../assets/background.png')} style={styles.container}>
        <View style={{flex: 1.3, padding: 15, borderBottomColor: '#F0B672', borderBottomWidth: 5}}>
          <Text style={styles.subtitle}>{data.ChallengeTitel.toUpperCase()}</Text>
          <Text style={styles.title}> {data.Stap} </Text>
        </View>
        <View style={{flex: 7, padding: 20}}>
            <Text style={styles.text}> {data.Challenge.challenge} </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <TouchableHighlight title="LOCATIE" onPress={this.pickImage.bind(this)} style={styles.button}>
            <Text style={styles.buttonTitle}> MAAK FOTO </Text>
          </TouchableHighlight>
        </View>
        <Alert
        showAlert={this.state.showAlert}
        title={this.state.alertTitle}
        message={this.state.message}
        message={this.state.confirmText}
        onConfirmPressed={this.onConfirmPressed.bind(this)}
        />
      </ImageBackground>)

    }          
    return (
      <ImageBackground source={require('../assets/background.png')} style={{flex: 1, justifyContent: 'center'}}> 
      <ActivityIndicator size="large" color="#F0B672" />
      <Alert
              showAlert={this.state.showAlert}
              title={this.state.alertTitle}
              message={this.state.message}
              message={this.state.confirmText}
              onConfirmPressed={this.onConfirmPressed.bind(this)}
              />
    </ImageBackground>
    );       
    }

   async pickImage(){
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status == 'granted') {
      let { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status == 'granted') {
      let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
      if (image.uri) {
        this.sendPhotoToContinue(image);
      }
    
    } else {
      this.showAlert({title: "Geen permissie", confirmText: "Probeer het opnieuw."})
    }
  } else {
    this.showAlert({title: "Geen permissie", confirmText: "Probeer het opnieuw."})
  }
}
  sendPhotoToContinue(image) {
    const section = this.props.navigation.getParam('section');
    AsyncStorage.getItem('LOGIN').then((value)=>{
      this.setState({loading: true})
      fetchData(config.url +  '/challengeWithPhoto', createFormData(image, JSON.parse(value), section)).then((result) => {
        try {
        if(result.authentication) {
          if(result.succes) {
            this.props.navigation.navigate('ChoosingScreen');
          } else {
            this.showAlert({title: "Er is iets mis gegaan", confirmText: "Probeer het opnieuw."})
          } 
        } else {
          this.props.navigation.navigate('SignInScreen');
        }
        } catch(error) {
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
  container: {

    flex: 1
  },
  challengeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "montserrat",
    color: 'white',
    alignSelf: 'flex-end'  },
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
const createFormData = (photo, body, section) => {
  const data = new FormData();
  console.log(photo);
  data.append("photo", {
    type: 'image/jpeg', // <-- this
    name:  section.ChallengeId + '-' + body.username + '.jpg',
    uri:photo.uri  });

  Object.keys(body).forEach(key => {
    console.log(key);
    data.append(key, body[key]);
  });

  return data;
};
