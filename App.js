import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        margin: 50,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "20%",
          backgroundColor: "rebeccapurple",
          marginBottom: 50,
        }}
      />
      <View
        style={{
          flex: 2,
          width: "50%",
          backgroundColor: "crimson",
          marginBottom: 50,
        }}
      />
      <View
        style={{
          flex: 3,
          width: "80%",
          backgroundColor: "gold",
        }}
      />
    </View>
  );
}
