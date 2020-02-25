import React, {Component} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import io from "socket.io-client";

const width = Dimensions.get("window").width * 0.85;

export default class Online extends Component{

    constructor() {
        super();

        this.pressed = this.pressed.bind(this);
        this.state = {
            tracker: [["", "", ""], ["", "", ""], ["", "", ""]],
            moves: 0,
            isOver: false,
            playerType: "",
            isTurn: false,
            isReady: false,
            message: "waiting for players"
        }
    }

    pressed(column, row) {
        if(this.state.isOver || !this.state.isTurn) {return}
        var newArr = this.state.tracker;
        if(newArr[column][row] != "") {
            return;
        }

        newArr[column][row] = this.state.playerType;
        this.setState({
            tracker: newArr,
            isTurn: false,
            moves: this.state.moves += 1
        });

        this.socket.emit("playerWent", {updatedArr: newArr});

        if(this.checkGame(this.state.playerType, column, row)) {
            this.socket.emit("gameOver", this.state.playerType + " wins");
        }else if(this.state.moves >= 5) {
            this.socket.emit("gameOver", "Its a Tie");
        }else {
            return;
        }
        
    }

    checkGame(turn, column, row) {
        const checkArr = this.state.tracker;

        if(checkArr[column][0] === turn && checkArr[column][1] === turn && checkArr[column][2] === turn) {
            return true;
        }else if(checkArr[0][row] === turn && checkArr[1][row] === turn && checkArr[2][row] === turn) {
            return true;
        }else if(checkArr[0][0] === turn && checkArr[1][1] === turn && checkArr[2][2] === turn) {
            return true;
        }else if(checkArr[2][0] === turn && checkArr[1][1] === turn && checkArr[0][2] === turn) {
            return true;
        }else{
            return false;
        }
    }

    componentDidMount() {
        this.socket = io("http://172.31.3.68:4000");
        this.socket.on("sendPlayer", (player) => {
            const turn = player.type === "X" ? true : false;
            this.setState({playerType: player.type, isTurn: turn});
            this.props.changeMessage(this.state.message);
        });

        this.socket.on("isReady", () => {
            const message = this.state.isTurn ? "your turn" : "opponents turn";
            this.setState({isReady: true, message});
            this.props.changeMessage(this.state.message);
        });

        this.socket.on("updateBoard", (data) => {
            this.setState({tracker: data.updatedArr, isTurn: true, message: "your turn"});
            this.props.changeMessage(this.state.message);
        });

        this.socket.on("endGame", (data) => {
            this.setState({isOver: true, message: data});
            this.props.gameOver(this.state.message);
        });

    }

    render() {
        return(
            <View style = {styles.outer}>
                    <View style = {styles.inner}>
                        <TouchableOpacity onPress = {() => this.pressed(0,0)} style = {styles.place}><Text>{this.state.tracker[0][0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(0,1)} style = {styles.place}><Text>{this.state.tracker[0][1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(0,2)} style = {styles.place}><Text>{this.state.tracker[0][2]}</Text></TouchableOpacity>
                    </View>

                    <View style = {styles.inner}>
                        <TouchableOpacity onPress = {() => this.pressed(1,0)} style = {styles.place}><Text>{this.state.tracker[1][0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(1,1)} style = {styles.place}><Text>{this.state.tracker[1][1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(1,2)} style = {styles.place}><Text>{this.state.tracker[1][2]}</Text></TouchableOpacity>
                    </View>

                    <View style = {styles.inner}>
                        <TouchableOpacity onPress = {() => this.pressed(2,0)} style = {styles.place}><Text>{this.state.tracker[2][0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(2,1)} style = {styles.place}><Text>{this.state.tracker[2][1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(2,2)} style = {styles.place}><Text>{this.state.tracker[2][2]}</Text></TouchableOpacity>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    
    outer: {
        position: "absolute",
        width: width, 
        height: width, 
        justifyContent: "space-around"
    },
    inner: {
        width: width, 
        flexDirection: "row", 
        justifyContent: "space-around"
    },
    place: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.26,
        height: width * 0.26
    }
  });