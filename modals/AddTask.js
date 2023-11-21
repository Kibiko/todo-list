import { useState } from "react"
import { Button, View, TextInput } from "react-native"


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
                placeholder="Enter new task"
                onChangeText={setText}
            />
            <Button 
                title="Add"
                onPress={() => handleAddTask(text)}
                onSub
            />

        </View>
    )
}

export default AddTask