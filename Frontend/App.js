import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Font, AppLoading } from 'expo';

import LocationScreen from './Screens/LocationScreen';
import SignInScreen from './Screens/SignInScreen';
import ChoosingScreen from './Screens/ChoosingScreen';
import FinishedScreen from './Screens/FinishedScreen';
import ChallengeInformationScreen from './Screens/ChallengeInformationScreen';
import ChallengeWithPhoto from './Screens/ChallengeWithPhoto';

export default class App extends Component {
  state={
    isReady: false
  }
   async componentDidMount() {
    await Font.loadAsync({
      'header': require('./assets/fonts/font.ttf'),
      'montserrat': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Hind': require('./assets/fonts/Hind-Regular.ttf'),

    });
    this.setState({isReady:true})
  }
    render() {
      if (!this.state.isReady) {
        return <AppLoading />;
      }
      return (
        <AppContainer />
      );    }
}
const AppNavigator = createStackNavigator({
  ChoosingScreen: {
    screen: ChoosingScreen
  },
  ChallengeInformationScreen: {
    screen: ChallengeInformationScreen
  },
  ChallengeWithPhoto: {
    screen: ChallengeWithPhoto
  },
  LocationScreen: {
    screen: LocationScreen
  },
  FinishedScreen: {
    screen: FinishedScreen
  },
  SignInScreen: {
    screen: SignInScreen
  },
});

const AppContainer = createAppContainer(AppNavigator);
