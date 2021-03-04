import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Picker,
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
import { Formik, Form, FieldArray } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as yup from "yup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

const validationSchema = yup.object().shape({
  summary: yup.string().required("Title is Required"),
  description: yup
    .string()
    .min(8, ({ min }) => `Description must be at least ${min} characters`)
    .required("Description is required"),
  attendees: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.split(/[\s,]+/) : [];
    })
    .of(yup.string().email(({ value }) => `${value} is not a valid email`)),
});

const AddItem = ({ addItem, credId }) => {
  let id = credId;

  // console.log("Fronm ADD ITEMS", id);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Task");
  const [rawDate, setRawDate] = useState("");
  const [auth, setAuth] = useState(null);

  const getData = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      return jsonValue != null ? setAuth(JSON.parse(jsonValue)) : setAuth(null);
    } catch (e) {
      // @TODO: error reading value
      console.log(e);
    }
  };

  React.useEffect(() => {
    getData("authCred");
  }, []);

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
    setRawDate(value);
    console.log(time, date, rawDate);
    console.log(Localization.timezone);
    hideDatePicker();
  };
  // console.log(auth);
  const finalSubmit = async (values) => {
    const payload = {
      auth,
      summary: values.summary,
      // location: "3595 California St, San Francisco, CA 94118",
      description: values.description,
      colorId: 1,
      date: date,
      time: time,
      type: type,
      _user: id,
      status: values.status,
      start: {
        dateTime: rawDate,
        timeZone: Localization.timezone,
      },
      end: {
        dateTime: rawDate,
        timeZone: Localization.timezone,
      },
      attendees: values["attendees"].split(",").map((email) => {
        return { email: email };
      }),
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 5 },
          { method: "popup", minutes: 5 },
        ],
      },
    };
    if (type != "Event") {
      payload["attendees"] = [];
    }
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    let url = `https://mysterious-journey-83983.herokuapp.com/api/v1/events/`;
    try {
      let response = await fetch(url, options);
      let responseJson = await response.json();
      console.log("Event added to BACKEND", responseJson.data);
      addItem([responseJson.data]);
      // return responseJson;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
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
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome name="remove" color={"#fff"} size={25} />
            </Pressable>
            <Text
              style={{
                fontSize: 25,
                color: "darkslateblue",
                fontWeight: "600",
                margin: 10,
                padding: 5,
              }}
            >
              Add New Task
            </Text>
            <Formik
              initialValues={{
                type: "Task",
                status: "Todo",
                summary: "",
                description: "",
                date: "",
                time: "",
                attendees: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => finalSubmit(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View style={styles.loginContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text>Type:</Text>
                    <Picker
                      selectedValue={type}
                      itemStyle={{ height: 50 }}
                      style={{ height: 50, width: 150, margin: 5 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setType(itemValue)
                      }
                    >
                      <Picker.Item label="Task" value="Task" />
                      <Picker.Item label="Event" value="Event" />
                    </Picker>
                  </View>
                  <TextInput
                    placeholder="Add Title"
                    onChangeText={handleChange("summary")}
                    style={styles.textInput}
                    onBlur={handleBlur("summary")}
                    name="summary"
                    value={values.summary}
                  />
                  {errors.summary && (
                    <Text style={{ fontSize: 16, color: "red" }}>
                      {errors.summary}
                    </Text>
                  )}
                  <TextInput
                    placeholder="Add Description"
                    onChangeText={handleChange("description")}
                    style={styles.textInput}
                    onBlur={handleBlur("description")}
                    name="description"
                    value={values.description}
                  />
                  {errors.description && (
                    <Text style={{ fontSize: 16, color: "red" }}>
                      {errors.description}
                    </Text>
                  )}

                  {type === "Event" && (
                    <View>
                      <TextInput
                        placeholder="Enter emails of guests seperated by coma"
                        onChangeText={handleChange("attendees")}
                        style={styles.textInput}
                        onBlur={handleBlur("attendees")}
                        name="attendees"
                        value={values.attendees}
                      />
                      {errors.attendees && (
                        <Text style={{ fontSize: 16, color: "red" }}>
                          {errors.attendees}bjhh
                        </Text>
                      )}
                    </View>
                  )}

                  <TouchableOpacity onPress={showDatePicker}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "darkslateblue",
                        fontWeight: "600",
                        margin: 10,
                        padding: 5,
                      }}
                    >
                      Select a Date and Time
                    </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                  />
                  <Button
                    onPress={handleSubmit}
                    style={styles.submit}
                    title="SAVE"
                    color="darkslateblue"
                    accessibilityLabel="Save new item"
                  />
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
  loginContainer: {
    width: 300,
    alignItems: "center",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#f4511e",
    position: "absolute",
    textAlign: "center",
    bottom: 20,
    right: 20,
  },
  buttonClose: {
    backgroundColor: "#f4511e",
    borderRadius: 20,
    position: "absolute",
    width: 40,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 5,
    right: 10,
    textAlign: "center",
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
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
  submit: {
    borderRadius: 10,
    padding: 20,
  },
});
export default AddItem;
