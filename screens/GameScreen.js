import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function GameScreen() {
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
        <Button
          title={paused ? "Restart" : "Pause"}
          onPress={() => setPaused(!paused)}
        />
      </View>
    </View>
  );
}
