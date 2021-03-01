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
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item, deleteItem }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate("TaskDetails", { item });
      }}
    >
      <View style={styles.listItemView} key={item.id}>
        <View style={styles.itemContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{item.summary}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <Text style={styles.listItemText}>{item.description}</Text>
          {item.status && (
            <Text
              style={{
                backgroundColor:
                  item.status === "Todo"
                    ? "#818583"
                    : item.status === "Done"
                    ? "#138058"
                    : "#f5a742",
                alignSelf: "flex-start",
                color: "#fff",
                padding: 3,
                borderRadius: 3,
              }}
            >
              {item.status}
            </Text>
          )}
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.date}>{item.time}</Text>
          {item.attendees.map((val, index) => {
            return <Text key={index}>{val.email}</Text>;
          })}
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
    margin: 0,
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
