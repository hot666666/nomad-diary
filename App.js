import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import AppLoading from "expo-app-loading";
import { ContextDB } from "./context";
import * as SQLite from "expo-sqlite";
import { initializeTable } from "./sqlite";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [db, setDB] = useState(null);

  const startLoading = async () => {
    const connection = await SQLite.openDatabase("db.db");
    initializeTable(connection);
    setDB(connection);
  };
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
    <ContextDB.Provider value={db}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ContextDB.Provider>
  );
}
