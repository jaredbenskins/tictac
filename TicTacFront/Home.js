import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native"

const width = Dimensions.get("window").width;
export default class Home extends Component {

    render() {
        return(
            <View style = {{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style = {{marginBottom: width * 0.2, fontSize: width * 0.1}}>Select Game Mode</Text>
                <View style = {styles.buttCont}>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("Local")} style = {styles.button}><Text>Local</Text></TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("Online")}  style = {styles.button}><Text>Online</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttCont: {
        height: width * 0.26, 
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.80,
        height: width * 0.11,
        borderRadius: 20,
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5

    }
});