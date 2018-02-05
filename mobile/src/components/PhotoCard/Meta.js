import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { human, systemWeights } from "react-native-typography";


const styles = StyleSheet.create({
  root: {
    minHeight: 50,
    // backgroundColor: "red",
    paddingHorizontal: 16
  },
  wrapper: {
    flex: 1
  },
  text: {
    ...human.footnoteObject,
    ...systemWeights.light
  }
});

export const Meta = ({
  caption = "this is a jon snow who wanted to defeat me",
  username = "NightKing",
  likeCount = 0,
  ...rest
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          Liked by <Text style={systemWeights.semibold}>{likeCount}</Text> and{" "}
          <Text style={systemWeights.semibold}>1,2368 others</Text>
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text numberOfLines={2} style={styles.text}>
          <Text style={systemWeights.semibold}>{username}</Text> {caption}
        </Text>
      </View>
    </View>
  );
};


export default Meta;
