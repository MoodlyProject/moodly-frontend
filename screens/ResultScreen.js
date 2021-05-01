// Aboutscreen.js
import React, { Component } from "react";
import { Button, View, Text } from "react-native";

export default class ResultScreen extends Component {
  render() {

    const emotion = this.props.route.params.emotion;
    const img = this.props.route.params.img;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Result Screen</Text>
        <Text>Emotion found: {emotion}</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}
