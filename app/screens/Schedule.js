import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
// import { Card, Avatar } from "react-native-paper";
// import Typography from "../components/Typography";

const today = new Date().toISOString().slice(0, 10);
console.log(today);

const Schedule = ({ route, navigation }) => {
  const [items, setItems] = useState({});
  const selectedDay = route.params ? route.params.date : "";
  // console.log("loading ...", route.params);
  let itemValues = route.params && route.params.itemValues;
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  const loadItems = (day) => {
    // setTimeout(() => {
    // console.log("loading ... items...", day);
    const newItems = {};
    // for (let i = -15; i < 85; i++) {
    // const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    // console.log(time);
    const strTime = day.dateString;
    for (let j = 0; j < itemValues.length; j++) {
      const event = itemValues[j];
      if (event.start && event.start.dateTime) {
        const sTime = event.start.dateTime;
        // const eTime = event.end.dateTime;
        const startTime = timeToString(sTime);
        // const endTime = timeToString(eTime);
        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
        if (strTime === startTime) {
          newItems[strTime].push({
            summary: event.summary,
            startTime: startTime,
            // endTime: endTime,
            description: event.description,
          });
        }
      }
      // }
    }
    // Object.keys(itemValues).forEach((key) => {
    //   newItems[key] = itemValues[key];
    // });
    setItems(newItems);
    // }, 1000);
  };

  // const timeToString = (time) => {
  //   const date = new Date(time);
  //   return date.toISOString().split("T")[0];
  // };
  const renderItem = (item) => {
    console.log(item);
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text
            style={{
              margin: 3,
              fontSize: 20,
            }}
          >
            {item.summary}
          </Text>
          <View>
            <Text
              style={{
                margin: 3,
                width: 200,
              }}
            >
              {item.description}
            </Text>
            <Text
              style={{
                margin: 3,
              }}
            >
              {item.startTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDay || today}
        renderItem={renderItem}
        futureScrollRange={50}
        renderEmptyData={() => {
          return (
            <View>
              <Text>No items for today!</Text>
            </View>
          );
        }}
        renderEmptyDate={renderEmptyDate}
        theme={{
          selectedDayBackgroundColor: "#f4511e",
          agendaDayTextColor: "#000",
          agendaDayNumColor: "green",
          agendaTodayColor: "#f4511e",
          agendaKnobColor: "#f4511e",
        }}
      />
    </View>
  );
};
const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>No items for today!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    textAlign: "center",
    alignSelf: "center",
    // backgroundColor: "#366ca1",
  },
  emptyData: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    textAlign: "center",
    color: "white",
    alignSelf: "center",
    backgroundColor: "grey",
  },
});

export default Schedule;
