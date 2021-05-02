import React from "react";
import { View, Linking, Text, Share } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles, buttons, text, dimens } from "../styles/styles";

export default ObjectLink = (props) => {
  const navigateTo = (link) => {
    Linking.openURL(link).catch((err) =>
      console.log("erro ocurred at going to link", err)
    );
  };

  const tellFriends = async (obj) => {
    let content = {
      message: `MOODLY
This is how I feel :P
🎵 ${obj.song.title}
${obj.song.link}
🎥 ${obj.movie.title}
${obj.movie.link}
      `,
      url: "https://moodly.com",
    };
    let options = {
      title: "Moodly status",
      dialogTitle: "Moodly dialog title",
    };

    try {
      const result = await Share.share(content, options);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      console.log("error -> " + err.message);
    }
  };

  if (props.type == "share") {
    return (
      <View>
        <FontAwesome.Button
          style={buttons.link}
          name={props.type}
          onPress={() => tellFriends(props.object)}
        >
          <Text style={text.links}>{props.object.title}</Text>
        </FontAwesome.Button>
      </View>
    );
  } else {
    return (
      <View>
        <FontAwesome.Button
          style={buttons.link}
          name={props.type}
          onPress={() => navigateTo(props.object.link)}
        >
          <Text style={text.links}>{props.object.title}</Text>
        </FontAwesome.Button>
      </View>
    );
  }
};
