import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { human, systemWeights } from "react-native-typography";

import { makeCircle } from "../../utils/themes/metrices";
import { defaultAvatar } from "../../utils/constants";

const styles = StyleSheet.create({
  root: {
    height: 60,
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "white"
  },
  userMetaWrapper: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center"
  },
  btnWrapper: {
    flex: 0.2,
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarWrapper: {
    flex: 0.2,
    alignSelf: "stretch",
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarImg: {
    // backgroundColor: "pink",
    ...makeCircle(40)
  },
  userInfoWrapper: {
    // backgroundColor: "black",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "600"
  },
  userLocationText: {
    ...human.footnoteObject,
    ...systemWeights.light
  }
});

export const header = ({
  avatar = defaultAvatar,
  username = "NightKing",
  location = "Sonoma, CA"
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.userMetaWrapper}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatarImg} />
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.usernameText}>{username}</Text>
          <Text style={styles.userLocationText}>{location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnWrapper}>
        <Icon name="dots-horizontal" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default header;
