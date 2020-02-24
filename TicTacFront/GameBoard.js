import React, {Component} from "react";
import {View, StyleSheet, Dimensions} from "react-native";

import Buttons from "./Buttons";
const width = Dimensions.get("window").width * 0.85;

export default class GameBoard extends Component {

    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.barCont}>
                    <View style = {styles.barHor}/>
                    <View style = {styles.barHor}/>
                </View>

                <View style = {{...styles.barCont, flexDirection: "row"}}>
                    <View style = {styles.barVert}/>
                    <View style = {styles.barVert}/>
                </View>

                <Buttons/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      width: width,
      height: width
    },
  
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