import React,{ useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '../pages/Home';
import Loading from "../components/Loading";
import LoginPage from "../pages/Login";
import HomeStack from "./HomeStack";
import LoginStack from "./LoginStack";
import getUserData from "../api/getUserData";
import { set } from "react-native-reanimated";

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [userData,setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true); 

    async function getUser(){
        const item = await AsyncStorage.getItem("userToken").then(res => {
            return res;
        })
        setUser(item)
    }

    useEffect(() => {
        try {
            getUser(user);
        } catch (error) {}
    },[])

    useEffect(() => {
        try {
            getUserData(user, setUserData)
        } catch (error) {}
    },[user])

    if (loading) {
        return(
            <Loading />
        )
    }

    return (
        //<LoginPage />
        <NavigationContainer>
            { user ? <HomeStack /> : <LoginStack /> }
        </NavigationContainer>
    )

    // if (!user) {
    //     return (
    //         <LoginPage />
    //         // <NavigationContainer>
    //         //     <LoginStack />
    //         // </NavigationContainer>
    //     )
    // }
    // else{
    //     return <HomePage user={user} setUser={setUser} />
    // }
}