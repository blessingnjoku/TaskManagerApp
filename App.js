import {
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TopDiplay from "./component/TopDisplay";
import TaskCard from "./component/TaskCard";
import { TaskData } from "./component/TaskData";
import { useEffect, useState } from "react";
import TabBottom from "./BottomMenu/TabBottom";
import { colors } from "./constant/colors";
import AddBtn from "./component/AddBtn";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";


let LoadUpdate = false
let isRender =true

export default function App() {
  const [task, setTask] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [display, setDisplay] = useState(false);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    GetItem();
  }, []);

  useEffect(() => {
    if(!LoadUpdate ){
      if(!isRender ){
        SaveItem();

      }else{
        isRender =false;
      }

    }else{
      LoadUpdate = false
    }
    SaveItem();
  }, [task]);

  const mapItems = () => {
    const filteredTasks = getFilteredTasks();
    return filteredTasks.map((todo) => (
      <TaskCard
        key={todo.id}
        todo={todo}
        onPress={UpdateTaks}
        onLongPress={deleteTask}
      />
    ));
  };

  function deleteTask(taskDelete) {
    Alert.alert("Delete Task", "Are you sure  you want to delete task?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTask(task.filter((i) => i.id !== taskDelete.id));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }
  function UpdateTaks(todo) {
    const UpdatedTask = {
      ...todo,
      status: !todo.status,
    };
    const UpdatedList = [...task];
    const TaskIndex = UpdatedList.findIndex((x) => x.id === UpdatedTask.id);
    UpdatedList[TaskIndex] = UpdatedTask; // Corrected assignment
    setTask(UpdatedList);
   
  }

  // function UpdateTaks(todo) {
  //   const UpdatedTask = {
  //     ...todo,
  //     status: !todo.status,
  //   };
  //   const UpdatedList = [...task];
  //   const TaskIndex = UpdatedList.findIndex((x) => x.id === UpdatedTask.id);
  //   UpdatedList[TaskIndex] = UpdateTaks;
  //   setTask(UpdatedList);
  //   console.log(UpdatedList)
  // }

  function getFilteredTasks() {
    switch (selectedTab) {
      case "all":
        return task;
      case "inProgress":
        return task.filter((todo) => !todo.status);
      case "Completed":
        return task.filter((todo) => todo.status);
    }
  }

  function addTask(todo) {
    const newTask = {
      id: uuid.v4(),
      task: inputValue,
      status: false,
    };
    setTask([...task, newTask]);
    setDisplay(false);
    setInputValue("");
  }

  // async function SaveItem() {
  //   console.log("SAVE");
  //   try {
  //     await AsyncStorage.setItem("@task", JSON.stringify(task));
  //   } catch (err) {
  //     alert(err);
  //   }
  // }

  // async function GetItem() {
  //   console.log("GET");
  //   try {
  //     const taskContent = await AsyncStorage.getItem(
  //       "@task",
  //       JSON.stringify(task)
  //     );
  //     const parsedList = JSON.parse(taskContent);
  //     setTask(parsedList);
  //   } catch (err) {
  //     alert(err);
  //   }
  // }



  async function SaveItem() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@task", JSON.stringify(task), (err) => {
        if (err) {
          console.error("Error saving data:", err);
        } else {
          console.log("Data saved successfully");
        }
      });
    } catch (err) {
      console.error("Error saving data:", err);
    }
  }
  
  async function GetItem() {
    console.log("GET");
    try {
      LoadUpdate = true;
      const taskContent = await AsyncStorage.getItem("@task", (err, result) => {
        if (err) {
          console.error("Error retrieving data:", err);
        } else {
          const parsedList = JSON.parse(result);
          setTask(parsedList);
        }
      });
    } catch (err) {
      console.error("Error retrieving data:", err);
    }
  }
  
  function DisplayForm() {
    return (
      <Dialog.Container
        visible={display}
        onBackdropPress={() => setDisplay(false)}
      >
        <Dialog.Title>Add Task</Dialog.Title>
        <Dialog.Description>What Task would you like to add</Dialog.Description>
        <Dialog.Input placeholder="enter task" onChangeText={setInputValue} />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => setDisplay(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label="Save"
          onPress={addTask}
        />
      </Dialog.Container>
    );
  }

  function ShowDialog() {
    setDisplay(true);
  }

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
          <View style={{ flex: 1 }}>
            <TopDiplay />
          </View>

          <View style={styles.con}>
            <View style={styles.textBtn}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginBottom: 20,
                }}
              >
                Your Task
              </Text>
              <AddBtn onPress={ShowDialog} />
            </View>

            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
              <View style={styles.BoxRow}>{mapItems()}</View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={styles.footer}>
        <TabBottom
          selectedTab={selectedTab}
          onPress={setSelectedTab}
          task={task}
        />
      </View>
      {DisplayForm()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
  con: {
    flex: 3,
    paddingHorizontal: 60,
    marginTop: -50,
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  BoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  footer: {
    // width: 500,
    height: 70,
    textAlign: "center",
    backgroundColor: colors.pri,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
