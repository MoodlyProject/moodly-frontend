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
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import env from "../environment";

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
            onPress={() => this.takeAPicture()}
          >
            <Text style={text.buttons}>Take a picture</Text>
          </FontAwesome.Button>
          <FontAwesome.Button
            style={buttons.primary}
            name="image"
            onPress={() => this.uploadPicture()}
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

  async takeAPicture() {
    let permissionGranted;
    let img;
    permissionGranted = await this.askForCameraPermission();
    if (permissionGranted) {
      img = await this.getCameraPic();
      let emotion = await this.getEmotion(img);
      if (emotion != "") {
        this.navigateTo("Result", { img: img, emotion: emotion });
      }
    }
  }

  async uploadPicture() {
    let granted;
    let img;
    granted = await this.askForLibraryPermission();
    if (granted) {
      img = await this.pickImage();
      let emotion = await this.getEmotion(img);
      if (emotion != "") {
        this.navigateTo("Result", { img: img, emotion: emotion });
      }
    }
  }

  async askForCameraPermission() {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== "granted") {
      Alert.alert("no permissions to access camera!", [{ text: "ok" }]);
      return false;
    }
    return true;
  }

  async askForLibraryPermission() {
    const permissionResult = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (permissionResult.status !== "granted") {
      Alert.alert("no permissions to access library!", [{ text: "ok" }]);
      return false;
    }
    return true;
  }

  async getCameraPic() {
    return ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });
  }

  navigateTo(location, params) {
    this.props.navigation.navigate(location, params);
  }

  async getEmotion(img) {
    return fetch(env.API + "/img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: img.base64,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("emotion was recovered");
        return data.emotion;
      })
      .catch((err) => {
        console.log("something has append at sending pic");
        console.log(err);
        return "";
      });
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    return result.base64;
  }
}


//navigate
//onPress={() => this.props.navigation.navigate("Result")}