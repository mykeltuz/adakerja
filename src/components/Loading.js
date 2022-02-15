import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <ActivityIndicator size="large" color="#4267b3" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  }
});

export default Loading;