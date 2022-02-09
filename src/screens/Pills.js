import React from 'react';
import { StyleSheet, Text, View } from "react-native";

const Pills = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tela de pílulas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Pills;