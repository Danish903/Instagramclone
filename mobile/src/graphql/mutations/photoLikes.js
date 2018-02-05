import gql from "graphql-tag";

export default gql`
  mutation($_id: ID!) {
    photoLikes(_id: $_id) {
      _id
      photoLikes
    }
  }
`;
