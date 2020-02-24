import React, {Component} from "react";
import {View, StyleSheet, Dimensions, Text} from "react-native";

import Buttons from "./Buttons";
const width = Dimensions.get("window").width * 0.85;

export default class GameBoard extends Component {


    constructor() {
        super();

        this.state = {
            isOver: false,
            message: ""
        }
        this.gameOver = this.gameOver.bind(this);
    }

    gameOver(message) {
        this.setState({
            isOver: true,
            message
        })
    }

    render() {
        return(

            <React.Fragment>
            <Text style = {{fontSize: width * 0.2}}>{this.state.message}</Text>
            <View style = {styles.container}>
                <View style = {styles.barCont}>
                    <View style = {styles.barHor}/>
                    <View style = {styles.barHor}/>
                </View>

                <View style = {{...styles.barCont, flexDirection: "row"}}>
                    <View style = {styles.barVert}/>
                    <View style = {styles.barVert}/>
                </View>

                <Buttons gameOver = {this.gameOver}/>
            </View>
            </React.Fragment>
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