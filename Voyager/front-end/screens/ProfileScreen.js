import {Text, View, Image, StyleSheet, ImageBackground} from "react-native";

// screen component
import Screen from '../components/Screen';

function ProfileScreen({ route }) {
    const { email, name, picture } = route.params.userinfo;

    return (
        <Screen>
            <ImageBackground style={{ flex: 4, width: '100%' }} source={{ uri: picture }} resizeMode={'cover'} blurRadius={3}>
                <View style={styles.topContainer}>
                    <View style={styles.picContainer}>
                        <Image source={{ uri: picture }} style={styles.pic}/>
                    </View>
                    <View style={styles.cardContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 10 }}>{(name.charAt(0).toUpperCase() + name.slice(1))}</Text>
                        <Text style={{ paddingBottom: 10 }}>{email}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.bottomContainer}>
                <View style={styles.settings}>
                    <Text>Add settings here</Text>
                </View>
            </View>
        </Screen>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    pic: {
        width: 100,
        height: 100,
        borderRadius: 400/ 2,
        marginTop: -10,
    },
    topContainer: {
        flex: 4,
        width: '100%',
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 10,
    },
    bottomContainer: {
        flex: 5,
        width: '100%',
    },
    picContainer: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        flex: 1,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settings: {
        flex: 5,
        marginTop: 20,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
})