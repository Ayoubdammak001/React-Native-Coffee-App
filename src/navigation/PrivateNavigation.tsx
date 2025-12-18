import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../screens/home/HomeScreen";
import ProductDetailsScreen from "../screens/product/ProductDetailScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileDetailsScreen from "../screens/profile/ProfileDetailsScreen";
import FavoriteProduct from "../screens/product/FavoriteProduct";
import SettingsScreen from "../screens/profile/SettingsScreen";
import NotificationsScreen from "../screens/profile/NotificationsScreen";
import HelpSupportScreen from "../screens/profile/HelpSupportScreen";
import PrivacyPolicyScreen from "../screens/profile/PrivacyPolicyScreen";

const PrivateStack = createNativeStackNavigator();

export const PrivateNavigation = () => {
    return (
        <PrivateStack.Navigator
            initialRouteName={"HomeScreen"}
            screenOptions={{
                animation: "slide_from_right",
                animationTypeForReplace: "pop",
                headerShown: false,
            }}
        >
            <PrivateStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="ProfileDetails"
                component={ProfileDetailsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="FavoriteProduct"
                component={FavoriteProduct}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="HelpSupport"
                component={HelpSupportScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
            <PrivateStack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
                options={{ header: () => null }}
                initialParams={undefined}
            />
        </PrivateStack.Navigator>
    );
};

export default PrivateNavigation;


