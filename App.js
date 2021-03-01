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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import uuid from "uuid-random";
// import {
//   useDimensions,
//   useDeviceOrientation,
// } from "@react-native-community/hooks";
import Header from "./app/screens/Header";
import ListItem from "./app/screens/ListItem";
import AddItem from "./app/screens/AddItem";
import Schedule from "./app/screens/Schedule";
import Details from "./app/screens/Details";
import Auth from "./app/screens/Auth";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [items, setItems] = useState([
    {
      id: uuid(),
      type: "Event",
      summary: "Milk contest",
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
      id: uuid(),
      type: "Task",
      status: "Done",
      summary: "Fry Eggs",
      description: "I will be hungry when i get home, i need to fy eggs",
      date: "2021-02-22",
      time: "11:00am",
      attendees: [],
    },
    {
      id: uuid(),
      type: "Event",
      summary: "Swimming",
      description:
        "All work and no play.. heh. The team will be at the pool for some excercise",
      date: "2021-03-08",
      time: "2:00pm",
      attendees: [{ email: "adenleabbey@gmail.com" }],
    },
    {
      id: uuid(),
      type: "Task",
      status: "In progress",
      summary: "Bread",
      description: "Buy Bread",
      date: "2021-03-12",
      time: "8:00am",
      attendees: [],
    },
    {
      id: uuid(),
      type: "Event",
      summary: "Code review",
      description: "All codes will be reviewed on 15th of March",
      date: "2021-03-15",
      time: "3:00pm",
      attendees: [
        { email: "adenleabbey@gmail.com" },
        { email: "abiodun@senergyeglobal.com" },
      ],
    },
    {
      id: uuid(),
      type: "Task",
      status: "Todo",
      summary: "Detox",
      description: "Detox with Orange juice for healthy living",
      date: "2021-2-12",
      time: "9:00am",
      attendees: [],
    },
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != id);
    });
  };

  const addItem = (input) => {
    console.log(input);
    if (!input) {
      Alert.alert("Error", "Your input cannot be empty");
    } else {
      setItems((prevItems) => {
        return [{ id: uuid(), ...input }, ...prevItems];
      });
    }
  };

  const Tasks = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Header title={"Stark's Kanban/Todo"} /> */}
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ListItem
              style={styles.description}
              item={item}
              deleteItem={deleteItem}
            />
          )}
        />
        <AddItem addItem={addItem} />
        <Button
          title="Go to Events"
          onPress={() => navigation.navigate("Events")}
        />
      </SafeAreaView>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ title: "Authenticate" }}
        /> */}
        <Stack.Screen
          name="Task"
          component={Tasks}
          options={{ title: "Tasks" }}
        />
        <Stack.Screen name="Events" component={Schedule} />
        <Stack.Screen
          name="TaskDetails"
          component={Details}
          options={{ title: "Task Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  description: {
    color: "darkslateblue",
    fontSize: 30,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default App;
