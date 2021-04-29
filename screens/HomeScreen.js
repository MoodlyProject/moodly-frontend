import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles, buttons, text, dimens } from "../styles/styles";

const dimentions = Dimensions.get("window");
const deviceWidth = dimentions.width;

export default class HomeScreen extends Component {
  render() {
    console.log(deviceWidth);
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/img/emotions.png")}
          style={{ width: deviceWidth, height: 180 }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <FontAwesome.Button
            style={buttons.primary}
            name="camera"
            onPress={() => this.props.navigation.navigate("Result")}
          >
            <Text style={text.buttons}>Take a picture</Text>
          </FontAwesome.Button>
          <FontAwesome.Button
            style={buttons.primary}
            name="image"
            onPress={() => this.props.navigation.navigate("Result")}
          >
            <Text style={text.buttons}>Upload a picture</Text>
          </FontAwesome.Button>
        </View>
        <View style={{ flex: 1, width: dimens.deviceWidth * 0.8 }}>
          <Text style={{ marginBottom: 10, ...text.secondary }}>
            Moodly can detect a human emotion through photo and suggest a movie
            and music thought your emotion. You can:
          </Text>
          <Text style={text.secondary}>* Take a picture</Text>
          <Text style={{ marginBottom: 10, ...text.secondary }}>
            * Upload a picture
          </Text>
          <Text style={text.secondary}>
            The result will be displayed after processing the image
          </Text>
        </View>
      </View>
    );
  }
}
