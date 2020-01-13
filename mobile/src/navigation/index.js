import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from '../screens/login'
import Home from '../screens/home'

export default createAppContainer(createSwitchNavigator({
    login: Login,
    home: Home
}, {
    initialRouteName: 'login'
}))


