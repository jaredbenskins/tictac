import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";

import Home from "./Home";
import GameBoardOnline from "./GameBoardOnline";
import GameBoardLocal from "./GameBoardLocal";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Local" component={GameBoardLocal} />
        <Stack.Screen name="Online" component={GameBoardOnline} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
