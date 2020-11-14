import React,{ useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '../pages/Home';
import Loading from "../components/Loading";
import LoginPage from "../pages/Login";
import HomeStack from "./HomeStack";
import LoginStack from "./LoginStack";

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true); 

    useEffect(() => {
        fetchUser();
    },[])

    async function fetchUser() {
        try {
            const item = await AsyncStorage.getItem("userData").then(res => {
                return JSON.parse(res);
            })
            setUser(item)
            if (initializing) setInitializing(false)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

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