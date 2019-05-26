import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    return (
        <AwesomeAlert
          show={this.props.showAlert}
          titleStyle={{fontFamily: 'montserrat'}}
          showProgress={false}
          title={this.props.title}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText={this.props.confirmText}
          confirmButtonColor="#F0B672"
          onConfirmPressed={this.props.onConfirmPressed}
        />
    );
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
