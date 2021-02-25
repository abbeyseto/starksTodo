import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 120,
    // borderBottomWidth: 0,
    borderBottomColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005cc5",
  },
  text: {
    fontSize: 18,
    letterSpacing: 1.5,
    fontWeight: "bold",
    color: "#fff",
  },
});
