import {Text, View} from "react-native";
import {useEffect, useState} from "react";

function ProfileScreen({ route }) {
    //console.log(route.params.userinfo);
    //console.log(route.params.userinfo.name);
    const name = route.params.userinfo.name;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello, {name}!</Text>
        </View>
    );
}

export default ProfileScreen;