import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.btn} 
            onPress={() => navigation.navigate('Rover')}>
        <AntDesign name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    display: "flex",
    position: "absolute",
    backgroundColor: "#142950",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    bottom: 30,
    right: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 5,
  },
});
