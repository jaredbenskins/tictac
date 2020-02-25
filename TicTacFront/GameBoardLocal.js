import React, {Component} from "react";
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";

import Local from "./Local";
import Bars from "./Bars"
const width = Dimensions.get("window").width * 0.85;

export default class GameBoardOnline extends Component {

    constructor() {
        super();

        this.state = {
            isOver: false,
            message: "X's Turn"
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
            <Text style = {{fontSize: width * 0.1, marginTop: width*0.3}}>{this.state.message}</Text>
            <View style = {styles.container}>
                <Bars/>
                <Local changeMessage = {this.changeMessage} gameOver = {this.gameOver}/>
            </View>
            {this.state.isOver ? 
            <View style = {styles.buttonsContainer}>
                <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigation.goBack()}><Text>Menu</Text></TouchableOpacity>
                <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigation.replace("Local")}><Text>Play Again</Text></TouchableOpacity>
            </View>
            : <View></View>}
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1, 
        alignItems: "center",
        backgroundColor: "white"
    },
    container: {
      width: width,
      height: width,
      marginTop: width*0.1
    },
    buttonsContainer: {
        width: width,
        marginTop: width * 0.1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttons: {
        width: width*0.48, 
        height: width*0.09,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 17

    }
  
  });