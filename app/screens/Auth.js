import React from "react";
import * as Google from "expo-google-app-auth";
import { Button, View, Platform } from "react-native";

let clientId;

Platform.OS === "android"
  ? (clientId =
      "687737428733-133hbn8dllv3pja04ufmegp0h9fv66jh.apps.googleusercontent.com")
  : (clientId =
      "687737428733-uieovk05iv2br228hshm2ou1rkbla5rp.apps.googleusercontent.com");

const config = {
  clientId,
  scopes: [
    "profile",
    "email",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
};

const Auth = (props) => {
  const Authenticate = async () => {
    console.log("Auth started...");
    // First- obtain access token from Expo's Google API
    const {
      type,
      accessToken,
      idToken,
      refreshToken,
      user,
    } = await Google.logInAsync(config);
    if (type === "success") {
      //   console.log(
      //     "ACCESS_TOKEN",
      //     accessToken,
      //     "ID_TOKEN",
      //     idToken,
      //     "REFRESH_TOKEN",
      //     refreshToken,
      //     "USER",
      //     user
      //   );
      // Then you can use the Google REST API
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const response = userInfoResponse;
    }
  };

  return (
    <View>
      <Button title="Authenticate" onPress={() => Authenticate()} />
    </View>
  );
};

export default Auth;
