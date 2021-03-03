import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  Button,
  Platform,
  StatusBar,
  FlatList,
  Image,
  View,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import uuid from "uuid-random";

import * as Google from "expo-google-app-auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "./app/screens/ListItem";
import AddItem from "./app/screens/AddItem";
import Schedule from "./app/screens/Schedule";
import Details from "./app/screens/Details";
import Auth from "./app/screens/Auth";

let clientId;
const Stack = createStackNavigator();
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
let dummyData = [
  {
    _id: uuid(),
    type: "Event",
    summary: "Milk contest",
    location: "",
    start: {
      dateTime: "",
      timeZone: "",
    },
    end: {
      dateTime: "",
      timeZone: "",
    },
    description:
      "I decided to do a Milk contest with the team today, the higher volume of milk consumed in 5 mins wins!",
    date: "2021-02-12",
    time: "9:00am",
    attendees: [
      { email: "adenleabbey@gmail.com" },
      { email: "abiodun@senergyeglobal.com" },
    ],
  },
  {
    _id: uuid(),
    type: "Task",
    status: "Done",
    summary: "Fry Eggs",
    location: "",
    start: {
      dateTime: "2021-03-06T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    end: {
      dateTime: "2021-03-06T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    description: "I will be hungry when i get home, i need to fy eggs",
    date: "2021-02-22",
    time: "11:00am",
    attendees: [],
  },
  {
    _id: uuid(),
    type: "Event",
    summary: "Swimming",
    location: "",
    start: {
      dateTime: "2021-03-04T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    end: {
      dateTime: "2021-03-04T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    description:
      "All work and no play.. heh. The team will be at the pool for some excercise",
    date: "2021-03-08",
    time: "2:00pm",
    attendees: [{ email: "adenleabbey@gmail.com" }],
  },
  {
    _id: uuid(),
    type: "Task",
    status: "In progress",
    summary: "Bread",
    location: "",
    start: {
      dateTime: "2021-03-09T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    end: {
      dateTime: "2021-03-09T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    description: "Buy Bread",
    date: "2021-03-12",
    time: "8:00am",
    attendees: [],
  },
  {
    _id: uuid(),
    type: "Event",
    summary: "Code review",
    location: "",
    start: {
      dateTime: "2021-03-07T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    end: {
      dateTime: "2021-03-07T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    description: "All codes will be reviewed on 15th of March",
    date: "2021-03-15",
    time: "3:00pm",
    attendees: [
      { email: "adenleabbey@gmail.com" },
      { email: "abiodun@senergyeglobal.com" },
    ],
  },
  {
    _id: uuid(),
    type: "Task",
    status: "Todo",
    summary: "Detox",
    location: "",
    start: {
      dateTime: "2021-03-10T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    end: {
      dateTime: "2021-03-10T22:09:27.623Z",
      timeZone: "Africa/Lagos",
    },
    description: "Detox with Orange juice for healthy living",
    date: "2021-2-12",
    time: "9:00am",
    attendees: [],
  },
];
const App = () => {
  const [items, setItems] = useState([]);
  const [cred, setCred] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteItem = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Deleted Tasks or Event cannot be recovered, Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => {
            let url = `http://localhost:5000/api/v1/events/${id}`;
            let options = {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            };

            fetch(url, options)
              .then((responseJson) => responseJson.json())
              .then((resp) => {
                console.log("Item deleted", resp);
                setItems((prevItems) => {
                  return prevItems.filter((item) => item._id != id);
                });
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("credstore", jsonValue);
    } catch (e) {
      // @TODO: saving error
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("credstore");
      jsonValue != null ? setCred(JSON.parse(jsonValue)) : setCred(null);
    } catch (e) {
      // @TODO: error reading value
      console.log(e);
    }
  };

  const getEvents = () => {
    console.log("Get event called");
    let options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    let credentials = cred && cred.data._id;
    console.log("From Get Events", credentials);
    // if (cred) {
    console.log("Fetching events....", credentials);
    let url = `http://localhost:5000/api/v1/events/${credentials}/users`;
    try {
      fetch(url, options)
        .then((responseJson) => responseJson.json())
        .then((events) => {
          let newItems = events.data;
          console.log(
            "All events for user from BACKEND fetched",
            JSON.stringify(newItems)
          );

          addItem(newItems);
        });

      // return responseJson;
    } catch (error) {
      console.error(error);
    }
    // }
  };
  React.useEffect(() => {
    getData();
    // setTimeout(() => {
    getEvents();
    // }, 1000);
  }, [loading]);

  // Clear Credentials from Local storage
  const clear = async () => {
    try {
      await AsyncStorage.clear();
      setCred(null);
      setItems([]);
      console.log("Done.");
    } catch (e) {
      console.log(e);
      // remove error
    }
  };

  const Tasks = ({ items, addItem, deleteItem }) => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ListItem
              style={styles.description}
              item={item}
              deleteItem={deleteItem}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {cred && cred.data ? (
          <AddItem addItem={addItem} credId={cred.data._id} />
        ) : null}
        <View
          style={{
            marginHorizontal: 20,
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="#f4511e"
            title="Go to Events"
            onPress={() => navigation.navigate("Events")}
          />
          <View />
          <Button color="#f4511e" title="Log Out" onPress={clear} />
        </View>
      </SafeAreaView>
    );
  };

  const addItem = (input) => {
    // console.log(input);
    if (!input) {
      setItems(dummyData);
    } else {
      dummyData.forEach((element) => {
        input.push(element);
      });
      setItems(input);
    }
  };

  const Authenticate = async () => {
    // console.log("Auth started...");
    // First- obtain access token from Expo's Google API
    const { type, user, refreshToken } = await Google.logInAsync(config);
    if (type === "success") {
      const credentials = {
        clientId,
        refreshToken,
        user,
      };
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      let url = `http://localhost:5000/api/v1/users`;
      // console.log(url);
      try {
        let response = await fetch(url, options);
        let responseJson = await response.json();
        console.log("Response From BACKEND", JSON.stringify(responseJson));
        storeData(responseJson);
        setCred(responseJson);
        setTimeout(() => {
          setLoading(!loading);
        }, 2000);

        // return responseJson;
      } catch (error) {
        console.error(error);
      }
    }
  };
  const UserLogo = () => {
    // console.log(cred);
    return (
      <Image
        style={{ width: 40, height: 40, borderRadius: 20, margin: 10 }}
        source={{
          uri: cred.data && cred.data.photoUrl,
        }}
      />
    );
  };
  return (
    <NavigationContainer>
      {cred ? (
        <Stack.Navigator
          initialRouteName="Task"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Task"
            title="Tasks"
            options={{ headerLeft: (props) => <UserLogo {...props} /> }}
          >
            {(props) => (
              <Tasks items={items} addItem={addItem} deleteItem={deleteItem} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Events" component={Schedule} />
          <Stack.Screen
            name="TaskDetails"
            component={Details}
            options={{ title: "Task Details" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" options={{ title: "Authenticate" }}>
            {(props) => <Auth auth={Authenticate} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  description: {
    color: "#366ca1",
    fontSize: 30,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default App;
