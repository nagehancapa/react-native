import React, { useRef, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function App() {
  const randomNum = useRef(Math.random()).current;
  const [text, setText] = useState("");

  const inputText = (text) => {
    setText(text);
  };

  const alertMessage = text;

  return (
    <ScrollView style={{ marginHorizontal: 40, marginVertical: 60 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 30 }}>
        Hello React Native
      </Text>
      <ActivityIndicator
        size="large"
        color="#c1262c"
        style={{ marginBottom: 30 }}
      />

      {[0, 1, 2, 3, 4].map((i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => Alert.alert("picsum photos")}
          >
            <Image
              key={i}
              source={{
                uri: `https://picsum.photos/500/300?random=${randomNum + i}`,
              }}
              style={{ width: "100%", height: 160, marginBottom: 30 }}
            />
          </TouchableOpacity>
        );
      })}

      <View
        style={{
          borderWidth: 2,
          borderColor: "black",
          padding: 20,
          marginBottom: 30,
        }}
      >
        <Text>Hello again!</Text>
      </View>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "black",
          padding: 20,
          marginBottom: 30,
        }}
        value={text}
        onChangeText={inputText}
      />
      <Button
        onPress={() => Alert.alert(alertMessage)}
        title="Learn More"
        color="#c1262"
      />
    </ScrollView>
  );
}
