import React, { useState, useEffect } from "react";
import Rocket from "./assets/Rocket_3.png";
import {
  StatusBar, //cambiar el diseño de la barra
  StyleSheet,
  View,
  Animated,
  Text,
} from "react-native";

const App = () => {
  const [animated, setAnimated] = useState(false);
  const [show] = useState(new Animated.Value(0));
  const [position] = useState(new Animated.Value(700));
  const [font] = useState(new Animated.Value(1));
  useEffect(() => {
    Animated.parallel([
      Animated.timing(show, {
        toValue: 1, //que el valor valga uno, en un segundo
        duration: 2500,
        delay: 2500,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: -700, //que el valor valga uno, en un segundo
        duration: 5000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      //creo un callback para que se ejecute despues de que termine todas las anteriores
      Animated.timing(font, {
        toValue: 200, //que el valor valga uno, en un segundo
        duration: 1000,
        delay: 1000,
        useNativeDriver: false,
      }).start(() =>setAnimated(true));
    });
  }, []);
  if (!animated) {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#142950"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Animated.Image
            style={[styles.image, { top: position }]}
            source={Rocket}
          />
          <Animated.Text
            style={[
              styles.text,
              { opacity: show, transform: [{ scale: font }] },
            ]}
          >
            Welcome
          </Animated.Text>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View backgroundColor="#DA6363">
          <Text style={styles.textInicio}>IniciO la aplicación</Text>
        </View>
      </>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#142950",
    justifyContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontSize: 50,
    color: "rgb(242,242,242)",
  },
  textInicio: {
    fontSize: 50,
    color: "#000",
    marginTop: 40,
  },
});

export default App;
