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
import { MapView, Linking, Location,Permissions } from "expo";
import Alert from './Components/Alert';

const config = require('../config');
const fetchData = require('../fetchData');
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
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.startInterval();
    });
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.focusListener.remove();
  }
  render() {
    const { navigation } = this.props;
    const section = navigation.getParam('section');
    this.latitude = section.Coords.latitude;
    this.longitude = section.Coords.longitude;

    if (!this.state.loading) {
      return(
        <ImageBackground source={require('../assets/background.png')} style={styles.container}>
        <View style={{flex: 2, justifyContent: 'center'}}>
            <Text style={styles.title}> ROUTE </Text>
        </View>
        <View style={[{width: Dimensions.get('window').width, flex: 5, justifyContent: 'center'}, styles.challengeContainer]}>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: this.latitude,
            longitude: this.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <MapView.Marker
            coordinate={{latitude: this.latitude,
            longitude: this.longitude}}
        />
        </MapView>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
        <TouchableHighlight onPress={() => {this._handlePressDirections(this.latitude, this.longitude)}}title="Login" style={styles.button}>
          <Text style={styles.buttonTitle}> OPEN MAPS </Text>
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
      <ImageBackground source={require('../assets/background.png')} style={styles.container}> 
        <ActivityIndicator size="large" color="#F0B672" />
      </ImageBackground>
    );
    }
    _calcCrow(lat1, lon1, lat2, lon2, unit) 
    {
      var R = 6371;
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }
    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      let location = await Location.getCurrentPositionAsync({});
      return location;
    };
  _handlePressDirections (latitude, longitude) {
      const url = "geo: 0,0?q=" + `${latitude},${longitude}`
      Linking.openURL(url)
    }
  toRad(Value) 
  {
    return Value 
  }
  startInterval() {
    this.timer = setInterval(() => {
      this._getLocationAsync().then((result) =>{
        if(this._calcCrow(result.coords.latitude, result.coords.longitude, this.latitude, this.longitude) < 0.20) {
          this.submitLocation();
        }
      });
    }, 1500);
  }
  submitLocation() {
    AsyncStorage.getItem('LOGIN').then((value) => {
      fetchData(config.url +  '/arrivedAtLocation', value).then((result) => {
        try {
          if(!result.authentication) this.props.navigation.navigate('SignInScreen');
            if(result.succes) return this.props.navigation.navigate('ChoosingScreen');
            this.startInterval();
        } catch (error) {
          this.showAlert({title: "Server ligt plat...", confirmText: "Probeer het opnieuw."})

        }

      })
    });
    this.setState({loading: true});
    clearInterval(this.timer);
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
  this.submitLocation();
}
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  MapView: {
    alignSelf: 'stretch',
    height: 300,
    marginTop: 40,
    marginBottom: 40,

  },
  title: {
    fontSize: 45,
    fontFamily: "montserrat",
    color: 'white',

  },
  subtitle: {
    fontSize: 17,
    marginRight: 15,
    fontFamily: "montserrat",
    color: 'white',

  },
  buttonTitle: {
    fontSize: 28,
    fontFamily: "montserrat",
    color: 'white',

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