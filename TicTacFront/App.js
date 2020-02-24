import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import GameBoard from "./GameBoard"

const width = Dimensions.get("window").width;

export default function App() {
  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>

      <GameBoard/>
    
    </View>

  );
}

const styles = StyleSheet.create({

});
