import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { FeedsPhotoFragment } from "./fragments";
//components
import { PhotoCard } from "../../components";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class FeedsScreen extends Component {
  state = {
    isRefreshing: false
  };
  _keyExtractor = item => item._id;
  _renderItem = ({ item }) => {
    return <PhotoCard data={item} photoLikes={this.props.photoLikes} />;
  };
  _refreshRequest = async () => {
    try {
      this.setState(prevState => ({
        ...prevState,
        isRefreshing: !prevState.isRefreshing
      }));
      await this.props.data.refetch();
      this.setState(prevState => ({
        ...prevState,
        isRefreshing: !prevState.isRefreshing
      }));
    } catch (error) {
      throw error;
    }
  };
  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={this.props.data.getPhotos}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._refreshRequest}
            />
          }
        />
      </View>
    );
  }
}

const getPhotos = gql`
  query {
    getPhotos {
      ...feedsPhoto
    }
  }
  ${FeedsPhotoFragment}
`;

// const signin = gql`
//   mutation signin($token: String!) {
//     signin(token: $token) {
//       token
//     }
//   }
// `;

const photoLikes = gql`
  mutation($_id: ID!) {
    photoLikes(_id: $_id) {
      _id
      photoLikes
    }
  }
`;

export default compose(graphql(getPhotos))(FeedsScreen);
