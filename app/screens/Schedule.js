import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
// import { Card, Avatar } from "react-native-paper";
// import Typography from "../components/Typography";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const today = new Date().toISOString().slice(0, 10);
console.log(today);

const Schedule = ({ route, navigation }) => {
  const [items, setItems] = useState({});
  const selectedDay = route.params ? route.params.date : "";
  const loadItems = (day) => {
    setTimeout(() => {
      console.log("loading ... items...");
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{item.name}</Text>
          {/* <Avatar.Text label="J" /> */}
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

export default Schedule;
