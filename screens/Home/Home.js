import React, {useState, useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Item from './components/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';


const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [rovers, setRovers] = useState([]);

  useEffect(async () => {
    if (isFocused) {
      const value = await AsyncStorage.getItem('rovers');
      if (value) setRovers(JSON.parse(value));
    }
  }, [isFocused]);

  const onDelete = async item => {
    try {
      const current = rovers.filter(value => value.cod !== item.cod);
      const json_value = JSON.stringify(current);
      await AsyncStorage.setItem('rovers', json_value);
      setRovers(current);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rovers}
        renderItem={props => (
          <Item {...props} navigation={navigation} onDelete={onDelete} />
        )}
        keyExtractor={item => item.name}
      />
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
