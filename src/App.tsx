/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  Platform,
  StyleSheet, UIManager,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationRootParamList } from './types/navigation.types';
import HomeScreen from './screens/HomeScreen';
import ModelListScreen from './screens/ModelListScreen';
import ModelDetailsScreen from './screens/ModelDetailsScreen';
import dbConnectionHandler from './utils/db_connector';
import IconButton from './components/IconButton';
import { Provider } from 'react-redux';
import store from './store';


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const RootStack = createNativeStackNavigator<NavigationRootParamList>()

const theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EAEAEA',
    background: '#F4F4F4',
    card: '#DEDEDE',
    text: '#4E4E4E',
    border:'#00000029'
  }
}

function App(): JSX.Element {

  useEffect(() => {
    dbConnectionHandler()
  }, [])

  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          <RootStack.Navigator initialRouteName='Home' screenOptions={({ navigation }) => ({ statusBarHidden: true,headerLeft: props => props.canGoBack && <IconButton onPress={()=>navigation.goBack()} label='back' prefixIcon={require('../assets/icons/backIcon.png')} customContainerStyle={styles.leftHeaderContainerStyle} customLabelStyle={styles.leftHeaderLabelStyle} /> })}>
            <RootStack.Screen name='Home' component={HomeScreen} />
            <RootStack.Screen name='Model' component={ModelListScreen} />
            <RootStack.Screen name='ModelDetails' component={ModelDetailsScreen} options={{title:'Model Details',headerRight:()=><IconButton label='Edit' customContainerStyle={styles.cutomDetailScreenRightHeaderStyle} prefixIcon={require('../assets/icons/edit-icon.png')} customLabelStyle={styles.cutomDetailScreenRightHeaderLabelStyle} />}} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  leftHeaderContainerStyle: {
    flexDirection:'column',
    gap:0,
    position:'relative',
    backgroundColor:'transparent',
    alignItems: 'center',
    marginEnd: 10,
    paddingHorizontal:0,
    paddingVertical:0,
    paddingTop: 5,
    borderRadius:0
  },
  leftHeaderLabelStyle: {
    position: 'absolute',
    fontSize: 10,
    bottom: -5
  },
  cutomDetailScreenRightHeaderStyle:{
    backgroundColor:'white',
    paddingVertical:10,
    paddingHorizontal:20,
    gap:5
  },
  cutomDetailScreenRightHeaderLabelStyle:{
    fontSize:12
  }
});

export default App;
