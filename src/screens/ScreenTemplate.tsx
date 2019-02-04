import React, { SFC } from "react";
import { Text, View, StyleSheet } from "react-native";

const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bbbbbb",
    justifyContent: "center",
    alignItems: "center"
  },
  text: { fontSize: 28, color: "#222222", textAlign: "center" }
});

const ScreenTemplate: SFC<{ name: string; color: string }> = ({
  name,
  color
}) => (
  <View style={[S.container, { backgroundColor: color }]}>
    <Text style={S.text}>This is the "{name}" screen</Text>
  </View>
);

export default ScreenTemplate;
