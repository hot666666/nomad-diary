import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import AppLoading from "expo-app-loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  const startLoading = () => {};
  const onFinish = () => setLoading(false);

  if (loading) {
    return (
      <AppLoading
        onError={console.error}
        startAsync={startLoading}
        onFinish={onFinish}
      />
    );
  }
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
