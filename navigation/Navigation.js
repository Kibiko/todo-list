import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomepageContainer from "../screens/HomepageContainer";

const Tab = createBottomTabNavigator()
const homeName = "Tasks"


const Navigation = () =>{

    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName = {homeName}>
                <Tab.Screen name ={homeName} component={HomepageContainer}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation