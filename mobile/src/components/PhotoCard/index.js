import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { human, iOSColors } from "react-native-typography";
import Header from "./Header";
import ActionBtns from "./ActionBtn";
import Meta from "./Meta";
import CommentInput from "../CommentInput";
import { compose, graphql } from "react-apollo";
import photoLikesMutation from "../../graphql/mutations/photoLikes";
import { FeedsPhotoFragment } from "../../screens/FeedsScreen/fragments";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
const Img =
  "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2017%2F06%2Fjon-snow-quiz.jpg&w=700&q=85";
const styles = StyleSheet.create({
  root: {
    minHeight: 600,
    paddingBottom: 10
  },
  img: {
    height: 400,
    width: "100%"
  },
  commentsWrapper: {
    height: 50,
    paddingHorizontal: 16
    // backgroundColor: "red"
  },
  commentViewAll: {
    ...human.calloutObject,
    color: iOSColors.midGray
  },
  timeWrapper: {
    marginTop: 16,
    minHeight: 20,
    // backgroundColor: "red",
    paddingHorizontal: 16
  },
  timeText: {
    ...human.footnoteObject,
    color: iOSColors.lightGray2
  }
});
export class PhotoCard extends Component {
  _onLikedPress = () => {
    this.props.onPhotoLikesMutation();
  };
  render() {
    return (
      <View style={styles.root}>
        <Header {...this.props.data.user} />
        <Image source={{ uri: this.props.data.image_url }} style={styles.img} />
        <ActionBtns
          postId={this.props.data._id}
          isLiked={this.props.data.isLiked}
          onLikedPress={this._onLikedPress}
        />
        <Meta
          caption={this.props.data.caption}
          likeCount={this.props.data.photoLikes}
        />
        <View style={styles.commentsWrapper}>
          <TouchableOpacity>
            <Text style={styles.commentViewAll}>View all 200 comments</Text>
          </TouchableOpacity>
          <CommentInput />
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>3 HOURS AGO</Text>
        </View>
      </View>
    );
  }
}

export default graphql(photoLikesMutation, {
  props: ({ mutate, ownProps }) => ({
    onPhotoLikesMutation: () =>
      mutate({
        variables: {
          _id: ownProps.data._id
        },
        update: (store, { data: { photoLikes } }) => {
          const id = defaultDataIdFromObject({
            __typename: "Photo",
            _id: ownProps.data._id
          });

          const p = store.readFragment({
            id,
            fragment: FeedsPhotoFragment
          });
          store.writeFragment({
            id,
            fragment: FeedsPhotoFragment,
            data: {
              ...p,
              isLiked: !ownProps.data.isLiked
            }
          });

          // console.log(p);
        }
      })
  })
})(PhotoCard);
