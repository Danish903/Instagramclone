import Photo from "../../models/Photo";
import { requireAuth } from "../../services/auth";
import LikePhoto from "../../models/LikePhoto";
const PHOTO_LIKES = "photoLikes";

export default {
  getPhotos: async (_, args, { user }) => {
    try {
      // console.log (user);
      await requireAuth(user);
      // console.log(user);
      const p1 = Photo.find({}).sort({ createdAt: -1 });
      const p2 = LikePhoto.findOne({ user: user._id });

      const [Posts, LikedPhotos] = await Promise.all([p1, p2]);


      const postsToSend = Posts.reduce((arr, post) => {
        let pt = post.toJSON();
        // console.log(pt);
        console.log(LikedPhotos);
        if(LikedPhotos.photo.some(photo => photo.equals(post._id))) {

          arr.push({
            ...pt,
            isLiked: true
          })
        } else {
          arr.push({
            ...pt,
            isLiked: false
          })
        }
        return arr;

      },[]);
      return postsToSend;
    } catch (error) {
      throw error;
    }
  },
  getPhoto: (_, { _id }) => Photo.findById(_id),

  createPost: async (_, args, { user }) => {
    if (user && user._id) {
      try {
        const photo = await Photo.create({ ...args, user: user._id });
        return photo;
      } catch (e) {
        throw new Error("Erorr in server createPhoto resolvers");
      }
    } else {
      return null;
    }
  },
  getUserPost: async (_, args, { user }) => {
    try {
      console.log(user._id);
      const posts = await Photo.find({ user: user._id.toString() });
      console.log(posts);
      return posts;
    } catch (e) {
      throw e;
    }
  },
  photoLikes: async (_, { _id }, { user }) => {
    if (user) {
      try {
        const likePhoto = await LikePhoto.findOne({ user: user._id });
        let pt = null;
        if (likePhoto.photo.some(l => l.equals(_id))) {
          likePhoto.photo.pull(_id);
          await likePhoto.save();
          pt = await Photo.update(
            {
              _id
            },
            {
              // isLiked: false,
              $inc: { photoLikes: -1 }
            },
            { upsert: true }
          );
        } else {
          likePhoto.photo.push(_id);
          await likePhoto.save();
          pt = await Photo.update(
            {
              _id
            },
            {
              // isLiked: true,
              $inc: { photoLikes: 1 }
            },
            { upsert: true }
          );
        }
        return Photo.findById(_id);
      } catch (error) {
        throw error;
      }
    } else {
      console.log(
        "User doesn't exist/// not authorize from phot-resolver.js file"
      );
    }
  }
};
