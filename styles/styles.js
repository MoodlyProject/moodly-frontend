import { StyleSheet, Dimensions } from "react-native";

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
    backgroundColor: "#9d03fc",
  },
  link: {
    width: dimentions.width * 0.8,
    fontSize: 25,
    justifyContent: "center",
    backgroundColor: "#B135FD",
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
    fontSize: 20,
    fontFamily: "textFont",
  },
  logo: {
    marginTop: 20,
    fontSize: 80,
    color: "#9d03fc",
    fontFamily: "logoFont",
  },
  feeling: {
    fontSize: 35,
    fontFamily: "logoFont",
  },
  desc: {
    fontSize: 15,
    color: "#8a8a8a",
    justifyContent: "center",
  },
});


export { myStyles, buttons, text, dimens };
