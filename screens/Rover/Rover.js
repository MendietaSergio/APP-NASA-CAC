import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';

//formik => para envios de formularios
//handleChange => cuando cambie el input
//handleBlur => al soltar el input
//handleSubmit => cuando envia el formulario
//values => el valor de cada input
const RoverSchema = Yup.object().shape({
  cod: Yup.string()
    .min(3, "Too Short!")
    .max(7, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});
const Rover = ({navigation}) => {
  const [error, setError] = useState("");
  handleSubmit = async (values) => {
      console.log("submit ", values);
    try {
      setError("");
      //para guardar los robots
      let rovers = [];
      const value = await AsyncStorage.getItem("rovers");
      console.log(value);
      if (value) {
        //si hay robot,
        rovers = JSON.parse(value);
        //busco si ya está
        if (
          rovers.find(
            (item) =>
              item.cod.trim().toUpperCase() === values.cod.trim().toUpperCase()
          )
        ) {
          return setError("Oops, the value is duplicate");
        } else {
          //si no está, lo pusheo en el array
          rovers.push({ ...values, cod: values.cod.trim().toUpperCase() });
          console.log("else => ", rovers);
          const json_value = JSON.stringify(rovers);
          //el mismo, lo guardo en asyncstorage
          await AsyncStorage.setItem("rovers", json_value);
        }
      } else {
        //si no hay , lo agrego en formato json.
        rovers.push(values);
        const json_value = JSON.stringify(rovers);
        //lo guardo
        await AsyncStorage.setItem("rovers", json_value);
      }
      navigation.navigate('Home');
    } catch (error) {
      AsyncStorage.removeItem("rovers");
    console.log("error desde catch");
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Formik
          initialValues={{ cod: "", name: "" }}
          validationSchema={RoverSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {error ? (
                <View style={[styles.form_group, styles.form_message_error]}>
                  <Text style={styles.form_message_error_text}>{error}</Text>
                </View>
              ) : null}
              <View style={styles.formGroup}>
                <Text style={styles.formText}>Code</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Code"
                  onChangeText={handleChange("cod")}
                  onBlur={handleBlur("cod")}
                  value={values.cod}
                />
                {errors.cod && touched.cod ? (
                  <Text style={styles.textError}>{errors.cod}</Text>
                ) : null}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formText}>Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <Text style={styles.textError}>{errors.name}</Text>
                ) : null}
              </View>
              <View style={styles.formGroup}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Add rover</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default Rover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 15,
  },
  formGroup: {
    marginTop: 30,
  },
  formInput: {
    backgroundColor: "#E3E3E3",
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 30,
  },
  formText: {
    fontWeight: "bold",
  },
  btn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    backgroundColor: "#142950",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 50,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
  },
  textError: {
    color: "red",
    fontWeight: "bold",
    fontSize: 13,
  },
  form_message_error: {
    backgroundColor: "#FFD6D6",
    borderColor: "#8D0000",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
