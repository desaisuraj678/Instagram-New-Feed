/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigatorStack from './src/core-navigation/app-navigation/AppNavigation';
import LoginNavigatorStack from './src/core-navigation/login-navigation/LoginNavigation';
import {AppContext} from './src/global-state/AppContext';
import {
  getDataFromLocalStorage,
  localStorageKeys,
  storeDataLocally,
} from './src/core-storage/LocalStorage';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getDataFromLocalStorage(localStorageKeys.IS_LOGGED_IN)
      .then(res => {
        setIsLoggedIn(res === 'TRUE' ? true : false);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
    storeDataLocally(localStorageKeys.IS_LOGGED_IN, 'FALSE');
  }, [isLoggedin]);

  const loginHandler = useCallback(() => {
    setIsLoggedIn(true);
    storeDataLocally(localStorageKeys.IS_LOGGED_IN, 'TRUE');
  }, [isLoggedin]);

  const appContextValue = useMemo(() => {
    return {
       isLoggedIn: isLoggedin,
       logout: logoutHandler,
       login: loginHandler
      };
  }, [isLoggedin]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <AppContext.Provider value={appContextValue}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            {isLoggedin ? <AppNavigatorStack /> : <LoginNavigatorStack />}
          </NavigationContainer>
        </GestureHandlerRootView>
      </AppContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
