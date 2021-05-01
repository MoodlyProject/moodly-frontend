import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStore } from 'redux';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import  emotionReducer  from './Reducers'
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import LoadingScreen from "./screens/LoadingScreen"
import { Provider } from "react-redux";

const store = createStore(emotionReducer);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown: false}}
        >
          <Stack.Screen
                name="Loading"
                component={LoadingScreen}
          />
          <Stack.Screen
                name="Home"
                component={HomeScreen}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
