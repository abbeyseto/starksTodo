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
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ListItem = ({ item, deleteItem }) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView} key={item.id}>
        <View style={styles.itemContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <Text style={styles.listItemText}>{item.description}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.attendees}>{item.attendees}</Text>
        </View>
        <FontAwesome
          name="remove"
          size={20}
          color="firebrick"
          onPress={() => deleteItem(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: "auto",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemContainer: {
    flexDirection: "column",
    padding: 10,
    width: "90%",
  },
  listItemView: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  listItemText: {
    fontSize: 18,
  },
  title: {
    flex: 4,
    fontSize: 25,
    color: "darkslateblue",
  },
  type: {
    flex: 1,
    fontWeight: "900",
  },
  date: {
    color: "grey",
    fontWeight: "600",
  },
  attendees: {},
  //
});

export default ListItem;
