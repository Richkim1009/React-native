import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import AccountScreen from './screens/AccountScreen';
import CreateScreen from './screens/CreateScreen';
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import InfoScreen from './screens/InfoScreen';
import ConnectScreen from './screens/ConnectScreen';
import ReviewList from './screens/ReviewList';
import Review from './screens/Review';
import RewriteReview from './screens/RewriteReview';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            // behavior={ Platform.OS === "android" ? "padding" : "height"}
            style={ {flex: 1}}
            // keyboardVerticalOffset={Platform.OS === "android" ? -64 : 0}
            >
            <Stack.Navigator>
              <Stack.Screen name='HomeScreen' 
                  component={HomeScreen}
                  options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name='MapScreen'
                  component={MapScreen}
                  options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name='AccountScreen'
                component={AccountScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="CreateScreen"
                component={CreateScreen}
                options={{
                 headerShown: false,
                }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }} 
              />
              <Stack.Screen 
                name="UserScreen"
                component={UserScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
               name="InfoScreen"
               component={InfoScreen}
               options={{
                 headerShown: false,
               }}
              />
                           <Stack.Screen
                name="ConnectScreen"
                component={ConnectScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="ReviewList"
                component={ReviewList}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="Review"
                component={Review}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name='RewriteReview'
                component={RewriteReview}
                options={{headerShown: false,}}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    
  ); 
}