import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Alert,
  SafeAreaView,
  Button,
  Platform,
  StatusBar,
  Image,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// const MyForm = (props) => (

// );

const AddItem = ({ addItem }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const formatAMPM = (value) => {
    var hours = value.getHours();
    var minutes = value.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const handleConfirmDate = (value) => {
    setDate(value.toISOString().slice(0, 10));
    setTime(formatAMPM(value));
    console.log(time, date);
    hideDatePicker();
  };

  const finalSubmit = (values) => {
    console.log("before", values);
    values["date"] = date;
    values["time"] = time;
    console.log("after", values);
    addItem(values);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome
                style={styles.button}
                name="remove"
                color={"#fff"}
                size={25}
              />
            </Pressable>
            <Formik
              initialValues={{
                type: "",
                status: "todo",
                title: "",
                description: "",
                date: "",
                time: "",
                attendees: [],
              }}
              onSubmit={(values) => finalSubmit(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  <TextInput
                    placeholder="Add Title"
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  <TextInput
                    placeholder="Add Description"
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                  />
                  <Button
                    title="Select a Date and Time"
                    onPress={showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                  />

                  <Button onPress={handleSubmit} title="Submit" />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome
          style={styles.button}
          name="plus"
          color={"#fff"}
          size={25}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    padding: 10,
    // elevation: 1,
  },
  buttonOpen: {
    backgroundColor: "darkslateblue",
    position: "absolute",
    textAlign: "center",
    bottom: 20,
    right: 20,
  },
  buttonClose: {
    backgroundColor: "crimson",
    borderRadius: 20,
    position: "absolute",
    width: 40,
    height: 40,
    padding: 0,
    margin: 5,
    right: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "normal",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default AddItem;
