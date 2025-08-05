import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import {ToastProvider} from 'react-native-toast-notifications';
import App from './src/App';

const AppWithToastProvider = () => (
  <ToastProvider
    normalColor="gray"
    successColor="gray"
    dangerColor="gray"
    warningColor="gray">
    <App />
  </ToastProvider>
);
AppRegistry.registerComponent(appName, () => AppWithToastProvider);
