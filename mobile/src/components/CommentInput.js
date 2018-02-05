import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { iOSColors } from "react-native-typography";

import { defaultAvatar } from "../utils/constants";
import { makeCircle } from "../utils/themes/metrices";

const styles = StyleSheet.create({
  root: {
    minHeight: 50,
    // backgroundColor: "#eee",
    flexDirection: "row",

  },
  avatarWrapper: {
    flex: 0.1,
    // backgroundColor: "yellow",
    justifyContent: "center"
  },
  avatar: {
      ...makeCircle(30)
  },
  inputWrapper: {
      flex: 1,
    //   backgroundColor: "red"
    justifyContent: "center",
    paddingLeft: 10
  },
  inputText: {
      color: iOSColors.lightGray2
  },
  input: {
      borderWidth: 1,
      borderColor: iOSColors.lightGray2,
      paddingVertical: 5,
      paddingHorizontal : 10,
      width: "95%",
      borderRadius: 20
  }
});

export default class Input extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: defaultAvatar }} style={styles.avatar} />
        </View>
        <TouchableOpacity style={styles.inputWrapper}>
            <View style={styles.input}>
                <Text style={styles.inputText} >Add a comment ...</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}
