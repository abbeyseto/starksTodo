import React from "react";
import {
  Button,
  View,
  Image,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const Auth = ({ auth }) => {
  return (
    <View>
      <Image
        style={{ width: Dimensions.get("window").width, height: 400 }}
        source={require("../assets/authimage.png")}
      />
      <TouchableOpacity style={styles.authButton} onPress={auth}>
        <Text style={styles.authText}>Authenticate With Google</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  authButton: {
    alignItems: "center",
    backgroundColor: "#f4511e",
    padding: 10,
    margin: 10,
  },
  authText: {
    color: "#eeeeee",
    fontSize: 20,
    fontWeight: "500",
    padding: 15,
  },
});
export default Auth;
