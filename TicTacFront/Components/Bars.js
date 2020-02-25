import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";

const width = Dimensions.get("window").width * 0.85;

export default () => (
    //Component to generate the black bars for board
    <React.Fragment>
        <View style = {styles.barCont}>
            <View style = {styles.barHor}/>
            <View style = {styles.barHor}/>
        </View>

        <View style = {{...styles.barCont, flexDirection: "row"}}>
            <View style = {styles.barVert}/>
            <View style = {styles.barVert}/>
        </View>
    </React.Fragment>        
)

const styles = StyleSheet.create({
    barHor: {
        backgroundColor: "black",
        width: "100%",
        height: "5%",
        borderRadius: 10
      },
    
      barVert: {
        backgroundColor: "black",
        width: "5%",
        height: "100%",
        borderRadius: 10
      },
      barCont: {
          justifyContent: "space-evenly",
          position: "absolute",
          width: width,
          height: width
      }
});