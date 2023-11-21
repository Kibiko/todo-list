import { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomepageContainer from "../screens/HomepageContainer";
import { Button, StyleSheet, View } from "react-native";
import { TaskModalContext } from "../contexts/TaskModalContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const Tab = createBottomTabNavigator()
const homeName = "Tasks"


const Navigation = () =>{

    const {addTaskModalOpen, setAddTaskModalOpen} = useContext(TaskModalContext)

    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName = {homeName}
                screenOptions={({route})=> ({
                    tabBarStyle:{
                        backgroundColor: "#BD897E",
                        // height: "8%"
                    },
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "black",
                    tabBarLabelStyle: {
                        fontSize: 12
                    },
                    tabBarIcon: ({color}) =>{
                        if(route.name === homeName){
                            return <FontAwesome5 name="tasks" size={20} color={color}/>
                        }
                    }
                })}>
                <Tab.Screen 
                    name ={homeName} 
                    component={HomepageContainer} 
                    options={{
                        headerRight: () => (
                            <Button 
                                color={"#7C90A0"} 
                                onPress={() => setAddTaskModalOpen(true)} 
                                title="add task"
                            />
                        ),
                        headerStyle:{
                            backgroundColor: "#BD897E"
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container:{
    },
})

export default Navigation