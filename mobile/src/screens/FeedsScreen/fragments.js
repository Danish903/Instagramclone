import gql from "graphql-tag";

export const FeedsPhotoFragment = gql`
  fragment feedsPhoto on Photo {
    _id
    image_url
    caption
    photoLikes
    isLiked
    user {
      username
      avatar
    }
  }
`;
