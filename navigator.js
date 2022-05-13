import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";

const Stacks = createNativeStackNavigator();

const Navigator = () => (
  <Stacks.Navigator screenOptions={{ headerShown: false }}>
    <Stacks.Screen name="Home" component={Home} />
  </Stacks.Navigator>
);

export default Navigator;
