import React, {Component} from "react";
import {View, StyleSheet, Dimensions, Text} from "react-native";

import Online from "./Online";
import Bars from "./Bars"
const width = Dimensions.get("window").width * 0.85;

export default class GameBoardOnline extends Component {

    constructor() {
        super();

        this.state = {
            isOver: false,
            message: ""
        }
        this.gameOver = this.gameOver.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
    }

    gameOver(message) {
        this.setState({
            isOver: true,
            message
        })
    }

    changeMessage(message) {
        this.setState({
            isOver: false,
            message
        })
    }

    render() {
        return(

            <View style = {styles.mainCont}>
            <Text style = {{fontSize: width * 0.2}}>{this.state.message}</Text>
            <View style = {styles.container}>
                <Bars/>
                <Online changeMessage = {this.changeMessage} gameOver = {this.gameOver}/>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "white"
    },
    container: {
      width: width,
      height: width
    },
  });