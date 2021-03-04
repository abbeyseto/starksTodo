import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const Details = ({ route, navigation }) => {
  const item = route.params.item;

  let itemValue = [];
  itemValue.push(item);
  console.log(itemValue);
  let date =
    item.start && item.start.dateTime
      ? new Date(item.start.dateTime).toDateString()
      : null;
  let time =
    item.start && item.start.dateTime
      ? new Date(item.start.dateTime).toLocaleTimeString()
      : null;
  return (
    <View>
      <Text>{route.params.item.summary}</Text>
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
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.date}>{time}</Text>
      {item.attendees &&
        item.attendees.map((val, index) => {
          return <Text key={index}>{val.email}</Text>;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: "auto",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    shadowOpacity: 0.5,
    margin: 5,
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
    color: "#366ca1",
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
export default Details;

{
  /* <Button
        title="See it in Calendar"
        onPress={() =>
          navigation.navigate("Events", {
            date: item.start.dateTime,
            itemValue: itemValue,
          })
        }
      /> */
}
