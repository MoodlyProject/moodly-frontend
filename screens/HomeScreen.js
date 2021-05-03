import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { buttons, text, dimens } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const dimentions = Dimensions.get("window");
const deviceWidth = dimentions.width;

export default class HomeScreen extends Component {
  state = {
    isReady: false,
  };

  async _cacheResourcesAsync() {
    const fontLoaded = await Font.loadAsync({
      logoFont: require("../assets/fonts/Damion-Regular.ttf"),
      textFont: require("../assets/fonts/GoogleSans-Medium.ttf"),
    });
    this.setState({isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync()}
          onFinish={()=>console.log('app loaded')}
          onError={()=>console.log('error happened')}
        />
      );
   
    }
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/img/emotions.png")}
          style={{ width: deviceWidth, height: 180 }}
        />
        <Text style={text.logo}>Moodly</Text>
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
          <Text style={{ marginBottom: 10, ...text.desc }}>
            Moodly can detect a human emotion through photo and suggest a movie
            and music thought your emotion. You can:
          </Text>
          <Text style={text.desc}>* Take a picture</Text>
          <Text style={{ marginBottom: 10, ...text.desc }}>
            * Upload a picture
          </Text>
          <Text style={text.desc}>
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
      if (img != null) {
        this.navigateTo("Result", { img: img });
      }
    }
  }

  async uploadPicture() {
    let granted;
    let img;
    granted = await this.askForLibraryPermission();
    if (granted) {
      img = await this.pickImage();
      if (img != null) {
        this.navigateTo("Result", { img: img });
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
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
      base64: false,
    });
    if (result.cancelled) return null;
    result = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 800, height: 800 } }],
      { compress: 1, base64: true }
    );
    return result.base64;
  }

  navigateTo(location, params) {
    this.props.navigation.navigate(location, params);
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
      base64: false,
    });
    if (result.cancelled) return null;
    result = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 800, height: 800 } }],
      { compress: 1, base64: true }
    );
    return result.base64;
  }
}


//navigate
//onPress={() => this.props.navigation.navigate("Result")}