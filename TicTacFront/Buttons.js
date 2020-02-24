import React, {Component} from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

const width = Dimensions.get("window").width * 0.85;

export default class Buttons extends Component{

    constructor() {
        super();
    }

    render() {
        return(
            <View style = {styles.outer}>
                    <View style = {styles.inner}>
                        <TouchableOpacity style = {styles.place}/>
                        <TouchableOpacity style = {styles.place}/>
                        <TouchableOpacity style = {styles.place}/>
                    </View>

                    <View style = {styles.inner}>
                        <TouchableOpacity style = {styles.place}/>
                        <TouchableOpacity style = {styles.place}/>
                        <TouchableOpacity style = {styles.place}/>
                    </View>

                    <View style = {styles.inner}>
                        <TouchableOpacity style = {styles.place}/>
                        <TouchableOpacity style = {styles.place}/>
                        <TouchableOpacity style = {styles.place}/>
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
        backgroundColor: "red",
        width: width * 0.2,
        height: width * 0.2
    }
  });