import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font'
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/modules/store';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/Base/Logo.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Icon.Ionicons.font,
        'Rubik-Black': require('./src/assets/fonts/Rubik-Black.ttf'),
        'Rubik-BlackItalic': require('./src/assets/fonts/Rubik-BlackItalic.ttf'),
        'Rubik-Bold': require('./src/assets/fonts/Rubik-Bold.ttf'),
        'Rubik-BoldItalic': require('./src/assets/fonts/Rubik-BoldItalic.ttf'),
        'Rubik-Italic': require('./src/assets/fonts/Rubik-Italic.ttf'),
        'Rubik-Light': require('./src/assets/fonts/Rubik-Light.ttf'),
        'Rubik-LightItalic': require('./src/assets/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Medium': require('./src/assets/fonts/Rubik-Medium.ttf'),
        'Rubik-MediumItalic': require('./src/assets/fonts/Rubik-MediumItalic.ttf'),
        'Rubik-Regular': require('./src/assets/fonts/Rubik-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
