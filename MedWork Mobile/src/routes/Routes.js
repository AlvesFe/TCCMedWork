import React,{ useState, useEffect, useContext } from "react";
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Login from "../api/login";
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import Loading from "../components/Loading";

export default function Routes() {
    const [user,setUser] = useState(null);

    if (!user) {
        return <LoginPage setUser={setUser} />
    }
    else{
        return <HomePage />
    }
}