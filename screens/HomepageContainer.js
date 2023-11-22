import { View, Text, FlatList, Button, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
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
    const [clearAllModal, setClearAllModal] = useState(false)

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
        const inComplete = { isCompleted: false }
        const updatedTodos = todos.map(todo =>{
            if(todo.id === id){
                return { ...todo, ...inComplete}
            }
            return todo;
            })
        saveTodos(updatedTodos) //save to AsyncStorage
        setTodos(updatedTodos) //save to viewing storage
    }

    const completeTodo = (id) => {
        const inComplete = { isCompleted: true }
        const updatedTodos = todos.map(todo =>{
            if(todo.id === id){
                return { ...todo, ...inComplete}
            }
            return todo;
            })
        saveTodos(updatedTodos)
        setTodos(updatedTodos) 
    }

    const clearAsyncStorage = async () => {
        try{
            await AsyncStorage.clear();
            setTodos([])
            // alert("All cleared")
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

            <Modal visible={addTaskModalOpen} animationType="slide" transparent={true} onRequestClose={() => setAddTaskModalOpen(false)}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setAddTaskModalOpen(false)} >
                    <TouchableWithoutFeedback>
                        <View style={styles.modal}>
                            <AddTask addTodo={addTodo}/>
                            <View style={styles.button}>
                                <Button
                                    title="close"
                                    onPress={() => setAddTaskModalOpen(false)}
                                    color={"#7C90A0"} 
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            <Modal visible={clearAllModal} animationType="slide" transparent={true}>
                <View style={styles.clearAllModal}>
                    <View style={styles.clearText}>
                        <Text style={styles.clearTextSize}>Are you sure you want to clear all?</Text>
                    </View>
                    <View style={styles.clearButtons}>
                        <View style={styles.eachClearButton}>
                            <Button
                                onPress={() =>  {
                                    clearAsyncStorage()
                                    setClearAllModal(false)}}
                                title="Yes"
                                color={"#7C90A0"}
                            />
                        </View>
                        <View style={styles.eachClearButton}>
                            <Button
                                onPress={()=>setClearAllModal(false)}
                                title="No"
                                color={"#7C90A0"} 
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <Button
                onPress={()=>setClearAllModal(true)}
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
    clearAllModal:{
        height: "20%",
        marginTop: "auto",
        overflow: "hidden",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFE3DC",
        justifyContent: "center",
        alignItems: "center",
        // flex: 1
    },
    clearText:{
        margin: 20
    },
    clearTextSize:{
        fontSize: 18
    },
    clearButtons:{
        flexDirection: "row",
    },
    eachClearButton:{
        marginHorizontal: 20
    },
    container:{
        flex: 1,
        backgroundColor: "#DBB4AD"
    },
    modalContainer:{
        flex: 1,
    },
    button:{
        margin: 20
    }
})

export default HomepageContainer