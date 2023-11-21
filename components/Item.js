import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>{textValue}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderBottomColor: "#5859f2",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowContainer: {
        flexDirection: "row",
        width: width / 2,
        alignItems: "center",
    },
    text: {
        color: "#4F50DC",
        fontSize: 20,
        marginVertical: 20,
        paddingLeft: 10,
    },
})

export default Item