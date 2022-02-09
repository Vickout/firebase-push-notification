import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Pills from '../screens/Pills';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Pills" component={Pills} />
        </Stack.Navigator>
    );
}

export default Routes;