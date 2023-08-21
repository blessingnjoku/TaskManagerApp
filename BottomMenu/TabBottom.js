import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TabBottom = ({ selectedTab, onPress, task }) => {

   
    const Todolist = task.reduce(
    (acc, todo) => {
      todo.status ? acc.Completed++ : acc.inProgress++;
      return acc;
    },
    {
      all: task.length,
      inProgress: 0,
      Completed: 0,
    }
  );
  console.log(Todolist)

  function applyStyle(TheIcon) {
    return {
      color: selectedTab === TheIcon ? "red" : "#000",
    };
  }

  return (
    <View style={styles.Iconcontainer}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={applyStyle("all")}>All {Todolist.all}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={applyStyle("inProgress")}>In Progress {Todolist.inProgress}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("Completed")}>
        <Text style={applyStyle("Completed")}>Completed {Todolist.Completed}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Iconcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  menu: {
    fontSize: 18,
    fontWeight: "900",
  },
});

export default TabBottom;
