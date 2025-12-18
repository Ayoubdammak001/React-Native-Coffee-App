import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginPage from "../screens/auth/LoginPage";
import SignUpPage from "../screens/auth/SignUpPage";
import WelcomeScreen from "../screens/onboarding/WelcomeScreen";

const PublicStack = createNativeStackNavigator();

export const PublicNavigation = () => {
    return (
        <PublicStack.Navigator
            initialRouteName={"WelcomeScreen"}
            screenOptions={{
                animation: "slide_from_right",
                animationTypeForReplace: "pop",
                headerShown: false,
            }}
        >
            <PublicStack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="Login"
                component={LoginPage}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="SignUp"
                component={SignUpPage}
                options={{ header: () => null }}
                initialParams={undefined}
            />
        </PublicStack.Navigator>
    );
};

export default PublicNavigation;
