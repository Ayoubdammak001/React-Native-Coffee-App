import { createNativeStackNavigator }from "@react-navigation/native-stack";
import React from "react";
import LoginPage from "../screens/auth/LoginPage";
import SignUpPage from "../screens/auth/SignUpPage";
import WelcomeScreen from "../screens/onboarding/WelcomeScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ProductDetailsScreen from "../screens/product/ProductDetailScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileDetailsScreen from "../screens/profile/ProfileDetailsScreen";
import FavoriteProduct from "../screens/product/FavoriteProduct";
import SettingsScreen from "../screens/profile/SettingsScreen";
import NotificationsScreen from "../screens/profile/NotificationsScreen";
import HelpSupportScreen from "../screens/profile/HelpSupportScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";


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
                name="SignUp"
                component={SignUpPage}
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
            <PublicStack.Screen
                name="ProfileDetails"
                component={ProfileDetailsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="FavoriteProduct"
                component={FavoriteProduct}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="HelpSupport"
                component={HelpSupportScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PublicStack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />

        </PublicStack.Navigator>

    )

}

export
    default PublicNavigation;