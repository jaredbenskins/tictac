import React, {Component} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

const width = Dimensions.get("window").width * 0.85;

export default class Local extends Component{

    constructor() {
        super();

        this.pressed = this.pressed.bind(this);
        this.state = {
            tracker: [["", "", ""], ["", "", ""], ["", "", ""]],
            Xturn: true,
            moves: 0,
            isOver: false
        }
    }

    pressed(column, row) {
        if(this.state.isOver) {return}
        var newArr = this.state.tracker;
        if(newArr[column][row] != "") {
            return;
        }
        const fill = this.state.Xturn ? "X" : "O";
        newArr[column][row] = fill;
        this.setState({
            tracker: newArr,
            Xturn: !this.state.Xturn,
            moves: this.state.moves += 1
        });

        if(this.checkGame(fill, column, row)) {
            this.props.gameOver(fill + " wins");
            this.setState({isOver: true});
        }else if(this.state.moves >= 9) {
            this.props.gameOver("its a tie");
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