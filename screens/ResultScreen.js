// Aboutscreen.js
import React, { Component, useState, useEffect } from "react";
import { Button, View, Text, ViewPropTypes } from "react-native";
import LoadingScreen from './LoadingScreen'
import env from "../environment";

export default ResultScreen = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  let [emotion, setEmotion] = useState('')
  const img = 'imghghgh';

  useEffect( () => {
    console.log(props.route.params.img)
    //sending base 64 img to get the conversion
    getEmotion(props.route.params.img)
      .then(em => {
        console.log(em)
        setEmotion(em);
        setTimeout(() => setIsLoading(false), 3000)
        return em;
      });
    
  }, []);
  
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Result Screen</Text>
        <Text>Emotion found: {emotion}</Text>
        <Button
          title="Go to Home"
          onPress={() => props.navigation.navigate("Home")}
        />
      </View>
    );
  }
  
  
}
