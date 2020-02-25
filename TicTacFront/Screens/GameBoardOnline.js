import React, {Component} from "react";
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";

import Online from "../Components/Online";
import Bars from "../Components/Bars";
const width = Dimensions.get("window").width * 0.85;

export default class GameBoardOnline extends Component {
    //Component for Online Game screen

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
        //Change label to display winner when game is over
        this.setState({
            isOver: true,
            message
        })
    }

    changeMessage(message) {
        //change label when user turn switches
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
                <Online changeMessage = {this.changeMessage} gameOver = {this.gameOver}/>
            </View>
            {this.state.isOver ? 
            <View style = {styles.buttonsContainer}>
                <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigation.goBack()}><Text>Menu</Text></TouchableOpacity> 
                <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigation.replace("Online")}><Text>Play Again</Text></TouchableOpacity> 
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