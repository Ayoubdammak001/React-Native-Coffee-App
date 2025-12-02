import { createNativeStackNavigator }from "@react-navigation/native-stack";
import React from "react";
import LoginPage from "../screens/auth/LoginPage";
import WelcomeScreen from "../screens/onboarding/WelcomeScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ProductDetailsScreen from "../screens/product/ProductDetailScreen";
import CartScreen from "../screens/cart/CartScreen";


const PublicStack = createNativeStackNavigator();



export const PublicNavigation = () => {

    return (

        <PublicStack.Navigator
            initialRouteName={"WelcomeScreen"}

            screenOptions={{
                animation:
                    'slide_from_right', animationTypeForReplace:
                    "pop"
            }}>

            <PublicStack.Screen
                name="Login"
                component={LoginPage}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />

        </PublicStack.Navigator>

    )

}

export
    default PublicNavigation;