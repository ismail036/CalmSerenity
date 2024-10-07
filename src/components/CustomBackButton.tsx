import {Image, TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'; // To handle navigation
const CustomBackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image
        source={require('../assets/icons/back.png')}
    style={{ width: 24, height: 24 }}
    />
    </TouchableOpacity>
);
};

export default CustomBackButton;
