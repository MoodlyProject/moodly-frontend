// Aboutscreen.js
import React, { Component, useState, useEffect } from "react";
import { Button, View, Text, ViewPropTypes, Image } from "react-native";
import LoadingScreen from './LoadingScreen'
import  env  from "../environment";
import Songs from "../database/music";
import Movies from "../database/movie";
import ObjectLink from "../components/ObjectLink";
import { dimens, myStyles } from "../styles/styles";

export default ResultScreen = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  let [emotion, setEmotion] = useState('')
  let [song, setSong] = useState("");
  let [movie, setMovie] = useState("");

  const img = props.route.params.img;
  const imgSize = dimens.deviceWidth * .8;

  useEffect( () => {
    //sending base 64 img to get the conversion
    console.log('use efects used')
    getEmotion(props.route.params.img)
      .then(em => {
        setEmotion(em);
        console.log('setTimeout called + 3 sec')
        setTimeout(() => setIsLoading(false), 3000)
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
    console.log('gettingMovieSuggestion')
    let suggestionsArray = Movies.filter(
      (movieObj) => movieObj.emotion == emotion
    );
    // get a random index for the suggestionArray
    let randomIndex = Math.floor(Math.random() * suggestionsArray.length);
    //pick a song obj with the random Index and assing to song
    setMovie(suggestionsArray[randomIndex]);
  };
  
  const getEmotion = async(img) =>{
    return fetch(env.API + "/img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("emotion was recovered");
        // Get Music suggestion and save it in a movie object variable
        getMovieSuggestion(data.emotion);
        // Get Movie suggestion and save it in a movie object variable
        getMusicSuggestion(data.emotion);
        return data.emotion;
      })
      .catch((err) => {
        console.log("something has append at sending pic");
        console.log(err);
        return "";
      });
  }

  if (isLoading) {
    return (
      <LoadingScreen></LoadingScreen>
    )
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
        <Image source={{  uri: `data:image/png;base64,${img}` }} style={ myStyles.img }/>
        <Text>You're feeling {emotion}</Text>
        <Text>We recommend watching and listening to the following:</Text>
        <View style={{flex: .5, justifyContent: "space-evenly", alignItems: "flex-start"}}>
          <ObjectLink object={song} type='music'></ObjectLink>
          <ObjectLink object={movie} type='film'></ObjectLink>
          <ObjectLink object={{title: 'Tell Your Friends', img, emotion, movie, song}} type='share'></ObjectLink>
        </View>
      </View>
    );
  }
  
  
}
