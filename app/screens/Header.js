import React from "react";
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
} from "react-native";

function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "darkslateblue",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
  },
  //
});

export default Header;
