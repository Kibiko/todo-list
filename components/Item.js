import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"

const {width, height} = Dimensions.get("window")

const Item = ({isCompleted, textValue, id, deleteTodo, incomepleteTodo, completeTodo}) => {

    const toggleItem = () => {
        if(isCompleted){
            incomepleteTodo(id)
        } else {
            completeTodo(id)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.rowContainer(textValue)}>
                <Text style={styles.text(isCompleted)}>{textValue}</Text>
                <TouchableOpacity onPress={() => deleteTodo(id)}>
                    <FontAwesome
                        name={"trash-o"}
                        size={30}
                        style={{color: "black", marginRight: 50, marginLeft: 20}}
                        ></FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleItem}>
                    <FontAwesome
                        name={isCompleted ? "check-circle-o" : "circle-o"}
                        size={30}
                        style={{color: isCompleted ? "green" : "black", marginRight: 30}}
                        ></FontAwesome>
                </TouchableOpacity>
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
    rowContainer:(textValue) => ({
        flexDirection: "row",
        width: width,
        height: textValue.length > 19? Math.ceil(height*textValue.length/30)/12 : height/12,
        alignItems: "center",
        justifyContent: "space-between"
    }),
    text:(isCompleted) => ({
        color: isCompleted? "green" :"black",
        fontStyle: isCompleted ? "italic" : "normal",
        textDecorationLine: isCompleted ? "line-through" : "none",
        fontSize: 20,
        paddingLeft: 10,
        marginLeft: 15,
        flex: 1
    }),
})

export default Item