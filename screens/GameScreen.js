import React, { useEffect, useState } from "react";
import { View, Text, Button, Share, Alert } from "react-native";
import { DeviceMotion } from "expo-sensors";
import MyButton from "../components/MyButton";

export default function GameScreen({ navigation }) {
  const [color, setColor] = useState("white");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    DeviceMotion.setUpdateInterval(250);
    const subscription = DeviceMotion.addListener((data) => {
      const hue = Math.max(0, Math.round(150 + 150 * data.rotation.beta) % 360);
      const saturation = Math.max(
        0,
        Math.round(30 + 60 * data.rotation.beta) % 100
      );
      if (!paused) {
        setColor(`hsl(${hue}, ${saturation}%, 50%)`);
      }
    });

    return () => subscription.remove();
  }, [setColor, paused]);

  const share = async (color) => {
    try {
      const result = await Share.share({
        message: `Check out this wonderful color: ${color}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      Alert.alert(error.message);
      console.log("failed sharing: ", error);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: color,
      }}
    >
      <Text style={{ marginBottom: 20, fontSize: 24, fontWeight: "bold" }}>
        Choose your color!
      </Text>
      <View>
        <MyButton
          title={paused ? "Restart" : "Pause"}
          onPress={() => setPaused(!paused)}
        />
      </View>
      <MyButton
        title={"Share this color"}
        onPress={() => {
          share(color);
        }}
      />
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}
