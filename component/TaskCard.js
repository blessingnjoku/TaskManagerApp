import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import shopping from "../assets/shopping.png";
import gym from "../assets/gym.png";

import { FontAwesome } from "@expo/vector-icons";

export default function TaskCard({ todo, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, {}]}
      onPress={() => onPress(todo)}
      onLongPress={() => onLongPress(todo)}
    >
      <Text
        style={[
          { fontSize: 22 },
          todo.status === true && {
            color: "red",
            textAlign: "center",
            textDecorationLine: "line-through",
          },
        ]}
      >
        {todo.task}
      </Text>

      {todo.status === true && (
        <FontAwesome name="check-circle" size={24} color="green" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {
    flexDirection: "column",
    justifyContent: "space-between",

    padding: 20,
    paddingVertical: 40,
    width: 180,
    height: 150,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    borderRadius: 15,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
