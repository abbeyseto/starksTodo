import React from "react";
import { Button, View, Platform } from "react-native";

const Auth = ({ auth }) => {
  return (
    <View>
      <Button color="#f4511e" title="Authenticate" onPress={auth} />
    </View>
  );
};

export default Auth;
