import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const styles = StyleSheet.create({
  root: {
    height: 50,
    // backgroundColor: "#eee",
    paddingHorizontal: 16,
    flexDirection: "row"
  },
  actionsWrapper: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  actionBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
    alignSelf: "stretch"
  },
  fakeView: {
    flex: 1.8
  },
  bookmark: {
    justifyContent: "center",
    alignItems: "center"
  }
});
export class ActionBtns extends Component {
  _onPhotoLike = async () => {
    await this.props.photoLikes({
      variables: {
        _id: this.props.postId
      },
      optimisticResponse: {
        __typename: "Mutation",
        photoLikes: {
          __typename: "Photo",
          isLiked: true,
          _id: this.props.postId,
          photoLikes: this.props.isLiked
            ? this.props.photoLikes - 1
            : this.props.photoLikes + 1,
          isLiked: !this.props.isLiked
        }
      }
    });

    // alert("LIked");
  };
  render() {
    // console.log("thisis from ", this.props.isLiked);
    let heartIcon = null;
    if (this.props.isLiked) {
      heartIcon = <Ionicons name="ios-heart" size={30} color="orangered" />;
    } else {
      heartIcon = <Ionicons name="ios-heart-outline" size={30} />;
    }
    return (
      <View style={styles.root}>
        <View style={styles.actionsWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={this.props.onLikedPress}
          >
            {heartIcon}
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <EvilIcons name="comment" size={35} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="ios-send-outline" size={35} />
          </TouchableOpacity>
        </View>

        <View style={styles.fakeView} />
        <TouchableOpacity style={styles.bookmark}>
          <Ionicons name="ios-bookmark-outline" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ActionBtns;
