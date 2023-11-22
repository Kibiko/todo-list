import { useState } from "react"
import { Button, View, TextInput, StyleSheet } from "react-native"


const AddTask = ({addTodo}) => {
    const [text, setText] = useState("")

    const handleAddTask = (task) => {
        if(task){
            addTodo(task)
            setText("")
        } else {
            alert("Please enter a task name")
        }
    }

    return (
        <View>
            <TextInput 
                value={text}
                placeholder="Enter new item"
                onChangeText={setText}
                selectionColor={"black"}
                underlineColorAndroid={"white"}
                style={styles.text}
            />
            <View style={styles.button}>
                <Button 
                    title="Add"
                    onPress={() => handleAddTask(text)}
                    color={"#7C90A0"} 
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        margin: 30,
        padding: 10,
        fontSize: 20
    },
    button:{
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AddTask