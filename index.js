/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
///Uncomment the following two  line if you  want to use the IAP
import {withIAPContext} from 'react-native-iap';
AppRegistry.registerComponent(appName, () => withIAPContext(App));

//AppRegistry.registerComponent(appName, () => App);
