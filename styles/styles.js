import { StyleSheet, Dimensions } from "react-native";

const primaryColor = "green";
const secondaryColor = "pink";
const dimentions = Dimensions.get("window");

const dimens = StyleSheet.create({
  deviceWidth: dimentions.width,
  deviceHeight: dimentions.height,
});

const myStyles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  },
  titleStyle: {
    fontSize: 30,
    justifyContent: "center",
  },
  img: {
    width: dimentions.width * 0.8,
    height: dimentions.width * 0.8,
    borderRadius: 15,
  },
});

const buttons = StyleSheet.create({
  primary: {
    fontSize: 25,
    width: 250,
    height: 50,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  link: {
    width: dimentions.width * 0.8,
    fontSize: 25,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  secondary: {
    fontSize: 30,
    justifyContent: "center",
  },
});

const text = StyleSheet.create({
  buttons: {
    color: "white",
    fontSize: 20,
  },
  links: {
    maxWidth: "80%",
    color: "white",
    fontSize: 15,
  },
  primary: {
    fontSize: 20,
    color: "white",
  },
  secondary: {
    fontSize: 17,
  },
});


export { myStyles, buttons, text, dimens };
