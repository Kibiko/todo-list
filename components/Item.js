import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"

const {width} = Dimensions.get("window")

const Item = ({textValue, id, deleteTodo, incomepleteTodo, completeTodo}) => {

    const toggleItem = () => {
        if(isCompleted){
            incomepleteTodo(id)
        } else {
            completeTodo(id)
        }
    }

    return(
        <View>
            <Text>{textValue}</Text>
        </View>
    )
}

export default Item