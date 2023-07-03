/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PortalProvider} from '@gorhom/portal';
import {NavigationContainer} from '@react-navigation/native';
import Root from './src/navigator/root';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store/store';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import {clearUserTrack} from './src/redux/action/TrackAction';
import {onLogout} from './src/redux/action/LoginAction';
import {getStoreData, setStoreData} from './src/utils/utilities';
import {setupPushNotification} from './src/utils/PushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
console.disableYellowBox = true;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [fcmToken, setfcmToken] = useState('');
  //const dispatch = useDispatch();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  useEffect(() => {
    // AsyncStorage.clear();
    // dispatch(onLogout());
    //dispatch(clearUserTrack());
  }, []);
  //Firebase Init
  useEffect(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: 'AIzaSyBF5838n5qq8R4brQ7rk3Cdagiai_kUA78',
        authDomain: 'comptrain-c551d.firebaseapp.com',
        projectId: 'comptrain-c551d',
        storageBucket: 'comptrain-c551d.appspot.com',
        messagingSenderId: '228880268807',
        appId: '1:228880268807:web:9064112f6c575a32f2f4a2',
        measurementId: 'G-YBC3TWJTQY',
      };
      //firebase.initalizing(firebaseConfig);
    }

    // signInAnonymously();
  }, []);

  const signInAnonymously = async () => {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const token = await getStoreData('F_TOKEN');
      if (typeof token == 'undefined' || token == null) {
        setupPushNotification(tokenCallBack);
      } else {
        tokenCallBack(token);
      }
    }
    fetchData();
  }, []);
  const tokenCallBack = async tokenn => {
    const token = await setStoreData('F_TOKEN', tokenn);
    setfcmToken(token);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PortalProvider>
            <Root />
          </PortalProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
