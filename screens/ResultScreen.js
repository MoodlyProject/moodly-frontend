// Aboutscreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import LoadingScreen from './LoadingScreen'
import  env  from "../environment";
import Songs from "../database/music";
import Movies from "../database/movie";
import ObjectLink from "../components/ObjectLink";
import { myStyles, text } from "../styles/styles";

export default ResultScreen = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  let [emotion, setEmotion] = useState('')
  let [song, setSong] = useState("");
  let [movie, setMovie] = useState("");

  const img = props.route.params.img;

  useEffect( () => {
    //sending base 64 img to get the conversion
    getEmotion(props.route.params.img).then((em) => {
      console.log('Emotion before setting up')
      console.log(em)
      setEmotion(em);
      setIsLoading(false)
      return em;
    });
  }, []);

  const getMusicSuggestion = (emotion) => {
    //get an array of songs for an emotion
    let suggestionsArray = Songs.filter(
      (songObj) => songObj.emotion == emotion
    );
    // get a random index for the suggestionArray
    let randomIndex = Math.floor(Math.random() * suggestionsArray.length);
    //pick a song obj with the random Index and assing to song
    setSong(suggestionsArray[randomIndex]);
  };

  const getMovieSuggestion = (emotion) => {
    //get an array of songs for an emotion
    console.log('emotion found')
    console.log(emotion)
    console.log('gettingMovieSuggestion')
    let suggestionsArray = Movies.filter(
      (movieObj) => movieObj.emotion == emotion
    );
    // get a random index for the suggestionArray
    let randomIndex = Math.floor(Math.random() * suggestionsArray.length);
    //pick a song obj with the random Index and assing to song
    setMovie(suggestionsArray[randomIndex]);
  };
  
  const pickColor = (emotion) => {
    console.log('calling to pick color')
    switch (emotion) {
      case "happy":
        return "#78faf3";
      case "angry":
        return "#b11f09";
      case "surprise":
        return "#9d03fc";
      case "sad":
        return "#797979";
      case "disgust":
        return "#537b7b";
      case "neutral":
        console.log('found neutral')
        return "#797979";
      default:
        return "#9d03fc";
    }
  };

  const convertEmotion = (em) => {
    em = em.toLowerCase();
    switch (em) {
      case 'sad':
        return 'sadness'
      case 'angry':
        return 'anger'
      case 'disgusted':
        return 'disgust'
      case 'fear':
        return 'fear'
      case 'happy':
        return 'happy'
      case 'neutral':
        return 'happy'
      case 'surprised':
        return 'surprice'
    }
  }

  const getEmotion = async (img) => {
    console.log("starting emotion recovering");
    return fetch(env.API + "/img", {
      method: "POST",
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: img,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("emotion was recovered");
        let emotionFriendly = convertEmotion(data.emotion)
        // Get Music suggestion and save it in a movie object variable
        getMovieSuggestion(emotionFriendly);
        // Get Movie suggestion and save it in a movie object variable
        getMusicSuggestion(emotionFriendly);
        return data.emotion.toLowerCase();
      })
      .catch((err) => {
        console.log(err);
        console.log("something has append at sending pic");
        return "";
      });
  };

  if (isLoading) {
    return (
      <LoadingScreen></LoadingScreen>
    )
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          source={{ uri: `data:image/png;base64,${img}` }}
          style={myStyles.img}
        />
        <View style={{ flex: 0.1, maxHeight: 20 }}>
          <Text style={text.secondary}>
            You're feeling
            <Text style={{ color: pickColor(emotion), ...text.feeling }}>
              {" " + emotion}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              maxWidth: "80%",
              fontFamily: "textFont",
              fontSize: 16,
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            We recommend watching and listening to the following:
          </Text>
          <ObjectLink object={song} type="music"></ObjectLink>
          <ObjectLink object={movie} type="film"></ObjectLink>
          <ObjectLink
            object={{ title: "Tell Your Friends", img, emotion, movie, song }}
            type="share"
          ></ObjectLink>
          <ObjectLink
            object={{ title: "Do it again" }}
            navigation={props.navigation}
            type="doit"
          ></ObjectLink>
        </View>
      </View>
    );
  }
  
  
}
