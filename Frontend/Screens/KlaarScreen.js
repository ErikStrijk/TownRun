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
  ActivityIndicator,
} from 'react-native';
import { MapView, Linking, encodeURIComponent, Platform, Camera, ImagePicker, Permissions} from "expo";
const fetchData = require('../fetchData');
const config = require('../config');

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    loading: false
  }
    render() {
      const { navigation } = this.props;
      const data = navigation.getParam('section');
      if (!this.state.loading) {

      return(
              <ImageBackground source={require('../assets/background.png')} style={styles.container}>
              <View style={{flex: 1.3, padding: 15, borderBottomColor: '#F0B672', borderBottomWidth: 5}}>
                <Text style={styles.subtitle}>{data.ChallengeTitel.toUpperCase()}</Text>
                <Text style={styles.title}> KLAAR </Text>

              </View>
              <View style={{flex: 7, padding: 20}}>
                  <Text style={styles.text}> {data.Challenge.tekst} </Text>
              </View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <TouchableHighlight title="LOCATIE" onPress={this.submitData.bind(this)} style={styles.button}>
                  <Text style={styles.buttonTitle}> GA DOOR </Text>
                </TouchableHighlight>
              </View>
            </ImageBackground>)
    }          
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.container} onLayout={(event) => {
        var {height} = event.nativeEvent.layout;
        this.setState({height})
     }}
    > 
      <ActivityIndicator size="large" color="#F0B672" />
    </ImageBackground>
    );       
    }

    _pickImage = async () => {
      const { navigation } = this.props;
      const data = navigation.getParam('section');
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status == 'granted') {
      let { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status == 'granted') {
      let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
      if (image.uri) {
        this.submitData(image);
      }
    
    }} else {
      alert('Cannot continue without accepting Cameraroll')
    }
    }

    submitData() {
      this.getLogin().then(value => {
        fetchData(config.url +  '/Challenge', value).then((result) => {
          if(result.authentication) {
            if(result.succes) {
              this.props.navigation.navigate('ScreenPicker');
            } 
          } else {
            this.props.navigation.navigate('LoginScreen');
          }
        })
      });
  }
    isJson = (str) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }
  getLogin(){
    return AsyncStorage.getItem('LOGIN').then((itemValue)=>{
      return  itemValue
    })
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
  todo: {
    marginTop: 10,
    marginRight: 15,
    fontFamily: "montserrat",
    color: 'white',

  },
  textContainer: {
    flexDirection: 'row',
    
    justifyContent: 'flex-end'
  },
  rightContainer: {
    flexDirection: 'row',
  },
  MapView: {
    alignSelf: 'stretch',
    height: 300,
    marginTop: 40,
    marginBottom: 40,

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
    data.append(key, body[key]);
  });

  return data;
};