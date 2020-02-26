import React, {Component} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import io from "socket.io-client";

const width = Dimensions.get("window").width * 0.85;

export default class Online extends Component{
    //Component to start an Online game

    constructor() {
        super();

        this.pressed = this.pressed.bind(this);
        this.state = {
            tracker: [["", "", ""], ["", "", ""], ["", "", ""]], //Array that tracks current board state
            moves: 0,
            isOver: false,
            playerType: "",     //Tracks whether user is an X or an O
            isTurn: false,      //keeps track of whos turn it is
            isReady: false,     //Checks if both users have entered a game

        }
    }

    pressed(column, row) {
        //Handle user touch on board
        if(this.state.isOver || !this.state.isTurn) {return} //Do nothing if is its not your turn or if game is over
        var newArr = this.state.tracker;
        if(newArr[column][row] != "") { //Do nothing if touched position is already taken
            return;
        }

        newArr[column][row] = this.state.playerType; 
        this.setState({  //Update Board
            tracker: newArr,
            isTurn: false,
            moves: this.state.moves += 1
        });

        this.props.changeMessage("opponents turn")
        this.socket.emit("playerWent", {updatedArr: newArr}); //Emit to server that player went and send updated Array

        //Check to see if current player won
        if(this.checkGame(this.state.playerType, column, row)) {
            this.socket.emit("gameOver", this.state.playerType + " wins"); //Emit that player won 
        }else if(this.state.moves >= 5) {
            this.socket.emit("gameOver", "Its a Tie"); //Emit that game was tie
        }else {
            return;
        }
        
    }

    checkGame(turn, column, row) {
        //Check to see if player has won the game
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

    async componentDidMount() {
        this.socket = io("http://localhost:4000"); //Connect to socket.io
        this.socket.on("sendPlayer", async (player) => {  //Handle info on player type from server
            const turn = player.type === "X" ? true : false;
            await this.setState({playerType: player.type, isTurn: turn});
        });

        this.socket.on("isReady", async () => {           //Handle that both players are ready from server
            const message = this.state.isTurn ? "your turn" : "opponents turn";
            await this.setState({isReady: true});
            this.props.changeMessage(message);
        });

        this.socket.on("updateBoard", async (data) => {   //handle the updated board array from serevr
            await this.setState({tracker: data.updatedArr, isTurn: true});
            this.props.changeMessage("Your turn");
        });

        this.socket.on("endGame", async (data) => {       //Handle the end of the game
            await this.setState({isOver: true});
            this.props.gameOver(data);
        });

    }

    render() {
        return(
            <View style = {styles.outer}>
                    <View style = {styles.inner}>
                        <TouchableOpacity onPress = {() => this.pressed(0,0)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[0][0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(0,1)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[0][1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(0,2)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[0][2]}</Text></TouchableOpacity>
                    </View>

                    <View style = {styles.inner}>
                        <TouchableOpacity onPress = {() => this.pressed(1,0)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[1][0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(1,1)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[1][1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(1,2)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[1][2]}</Text></TouchableOpacity>
                    </View>

                    <View style = {styles.inner}>
                        <TouchableOpacity onPress = {() => this.pressed(2,0)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[2][0]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(2,1)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[2][1]}</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.pressed(2,2)} style = {styles.place}><Text style = {{fontSize: width*0.15}}>{this.state.tracker[2][2]}</Text></TouchableOpacity>
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