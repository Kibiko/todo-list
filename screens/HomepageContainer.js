import { View, Text, FlatList, Button } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import Item from "../components/Item"

const HomepageContainer = () => {

    const [todos, setTodos] = useState([])

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
            alert("Storage cleared")
        } catch (e) {
            alert("Unable to clear storage", e)
        }
    }


    return(
        <View>
            <FlatList
                data={Object.values(todos)}
                renderItem={(row) => {
                    return (
                        <Item
                            isCompleted={row.item.isCompleted}
                            textValue={row.item.task}
                            id={row.item.id}
                            deleteTodo={deleteTodo}
                            completeTodo={completeTodo}
                            incomepleteTodo={incompleteTodo}
                        />
                    )
                }}
                keyExtractor={(item) => item.id}
            />
            <Button
                onPress={clearAsyncStorage}
                title="Clear all"
            />
        </View>
    )
}

export default HomepageContainer