import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { Home } from "./src/pages/Home";
import { Setting } from "./src/pages/Setting";
import { Cart } from "./src/pages/Cart";
import { ThemeContext } from "./src/context";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.foreground,
        },
    });
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName = "question";

                            if (route.name === "Home") {
                                iconName = "home";
                            } else if (route.name === "Setting") {
                                iconName = "user-cog";
                            } else if (route.name === "Cart") {
                                iconName = "shopping-cart";
                            }
                            return (
                                <FontAwesome5
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: theme.text,
                        inactiveTintColor: theme.background,
                        style: { backgroundColor: theme.foreground },
                    }}>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Cart" component={Cart} />
                    <Tab.Screen name="Setting" component={Setting} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};