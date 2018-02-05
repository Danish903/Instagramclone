import PhotoResolver from "./photo-resolver";
import UserResolver from "./user-resolver";
import User from "../../models/User";
export default {
  Photo: {
    user: async ({ user }) => {
      const me = await User.findById(user);
      return me;
    }
  },
  Query: {
    getPhotos: PhotoResolver.getPhotos,
    getPhoto: PhotoResolver.getPhoto,
    getUserPost: PhotoResolver.getUserPost,
    me: UserResolver.me
  },
  Mutation: {
    signup: UserResolver.signup,
    login: UserResolver.login,
    signin: UserResolver.signin,
    createPost: PhotoResolver.createPost,
    photoLikes: PhotoResolver.photoLikes
  }
};
