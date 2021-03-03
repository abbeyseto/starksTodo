import React from "react";
import { Text, View, Button } from "react-native";

const Details = ({ route, navigation }) => {
  const item = route.params.item;
  return (
    <View>
      <Text>{route.params.item.summary}</Text>
      <Button
        title="See it in Calendar"
        onPress={() =>
          navigation.navigate("Events", { date: item.start.dateTime })
        }
      />
    </View>
  );
};

export default Details;
