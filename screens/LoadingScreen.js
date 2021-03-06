import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

class LoadingScreen extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };

  componentDidMount() {
    const { LogoAnime, LogoText } = this.state;
    Animated.parallel([
      Animated.loop(
        Animated.spring(LogoAnime, {
          toValue: 2,
          tension: 15,
          friction: 1,
          duration: 1000,
        }),
        { iterations: 1000 }
      ).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1200,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });

      //setTimeout(switchToAuth, 1500);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 2],
              outputRange: [40, 0],
            }),
          }}
        >
          <Text style={styles.logo}>M</Text>
        </Animated.View>
        <Animated.View style={{ opacity: this.state.LogoText }}>
          <Text style={styles.logoText}> Working on it </Text>
        </Animated.View>
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d03fc",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontFamily: "textFont",
    fontSize: 30,
    marginTop: 29.1,
    fontWeight: "300",
  },

  logo: {
    color: "#FFFFFF",
    fontFamily: "logoFont",
    fontSize: 80,
  },
});
