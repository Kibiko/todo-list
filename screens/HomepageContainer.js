import { View, Text, FlatList, Button, Modal, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { useContext, useEffect, useState } from "react"
import Item from "../components/Item"
import { TaskModalContext } from "../contexts/TaskModalContext"
import AddTask from "../modals/AddTask"

const HomepageContainer = () => {

    const [todos, setTodos] = useState([])
    const {addTaskModalOpen, setAddTaskModalOpen} = useContext(TaskModalContext)

    componentDidMount = () => {
        loadTodos();
    };

    useEffect(() => {
        loadTodos()
    },[])

    const loadTodos = async () => {
        try {
            const getTodos = await AsyncStorage.getItem("todos");
            const parsedTodos = JSON.parse(getTodos)
            if (parsedTodos) {
                setTodos(parsedTodos)
            } else {
                setTodos([])
            }
        } catch(e) {
            alert("Cannot load data")
        }
    }

    const saveTodos = async (newTodo) =>{
        await AsyncStorage.setItem("todos", JSON.stringify(newTodo))
    }

    const addTodo = (task) => {
        const ID = uuidv4()
        const newTodo = { id: ID, title: task }
        const currentTodoList = [...todos]
        currentTodoList.push(newTodo)
        saveTodos(currentTodoList)
        setTodos(currentTodoList)
    }

    const deleteTodo = (id) =>{
        const updatedTodos = todos.filter(todo => todo.id !== id)
        saveTodos(updatedTodos)
        setTodos(updatedTodos)
    }

    const incompleteTodo = (id) => {
        setTodos((prevState) =>{
            const newState = {...prevState, [id]: {...prevState[id], isCompleted: false},}
            saveTodos(newState)
            return { ...newState }
        })
    }

    const completeTodo = (id) => {
        setTodos((prevState) =>{
            const newState = {...prevState, [id]: {...prevState[id], isCompleted: true},}
            saveTodos(newState)
            return { ...newState }
        })
    }

    const clearAsyncStorage = async () => {
        try{
            await AsyncStorage.clear();
            setTodos([])
            alert("Tasks cleared")
        } catch (e) {
            alert("Unable to clear storage", e)
        }
    }


    return(
        <View style={styles.container}>
            <FlatList
                data={Object.values(todos)}
                renderItem={(row) => {
                    return (
                        <Item
                            isCompleted={row.item.isCompleted}
                            textValue={row.item.title}
                            id={row.item.id}
                            deleteTodo={deleteTodo}
                            completeTodo={completeTodo}
                            incomepleteTodo={incompleteTodo}
                        />
                    )
                }}
                keyExtractor={(item) => item.id}
            />

            <Modal visible={addTaskModalOpen} animationType="slide" transparent={true}>
                <View style={styles.modal}>
                    <AddTask addTodo={addTodo}/>
                    <View style={styles.button}>
                        <Button
                            title="close"
                            onPress={() => setAddTaskModalOpen(false)}
                        />
                    </View>
                </View>
            </Modal>
  
            <Button
                onPress={clearAsyncStorage}
                title="Clear all"
                color={"#7C90A0"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    modal:{
        height: "40%",
        marginTop: "auto",
        overflow: "hidden",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFE3DC",
        justifyContent: "center",
        alignItems: "center",
        // flex: 1
    },
    container:{
        flex: 1,
        backgroundColor: "#DBB4AD"
    },
    button:{
        margin: 20
    }
})

export default HomepageContainer