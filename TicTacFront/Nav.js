import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import {Dimensions} from "react-native"

import Home from "./Home";
import GameBoardOnline from "./GameBoardOnline";
import GameBoardLocal from "./GameBoardLocal";
const width = Dimensions.get("window").width;


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
              height: 130,
            },
            headerTitleStyle: {
                fontSize: width * 0.1
            }
          }}
      >
        <Stack.Screen name="Home" component={Home} options = {{title: "Tic Tac Toe"}} />
        <Stack.Screen name="Local" component={GameBoardLocal} options = {{title: "Tic Tac Toe"}} />
        <Stack.Screen name="Online" component={GameBoardOnline} options = {{title: "Tic Tac Toe", headerLeft: null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
