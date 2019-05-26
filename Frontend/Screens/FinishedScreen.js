import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Image,
  ImageBackground,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { MapView, Linking, encodeURIComponent, Platform, Camera, ImagePicker, Permissions} from "expo";

import {Left, Right} from 'native-base';
export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    latidude: 1,
      longitude: 1,
  }
    render() {
      return(
        <ImageBackground source={require('../assets/background.png')} style={styles.container} onLayout={(event) => {
          var {height} = event.nativeEvent.layout;
          this.setState({height})
       }}
      >
        <View style={{flex: 2, justifyContent: 'center'}}>
            <Text style={styles.title}> CONGRATS </Text>
        </View>
        <View style={[{width: Dimensions.get('window').width, flex: 5, justifyContent: 'center'}, styles.challengeContainer]}>
          <Image
            source={require('../assets/trophy.png')}
          />
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>

        </View>
      </ImageBackground>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

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
    fontSize: 18,
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
  title: {
      marginTop: 10,
    fontSize: 45,
    fontFamily: "montserrat",
    color: 'white',

  },
  subtitle: {
    fontSize: 25,
    marginRight: 15,
    fontFamily: "montserrat",
    color: 'white',

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
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.17,


    backgroundColor: '#F0B672',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
  }
});