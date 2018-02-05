import User from "../../models/User";
import { facebookAuth } from "../../services/facebookAuth";

import LikePhoto from "../../models/LikePhoto";

export default {
  signup: async (_, { fullName, ...rest }) => {
    //   console.log(rest);
    const [first_name, last_name] = fullName.split(" ");
    const user = await User.create({
      first_name,
      last_name,
      ...rest
    });

    await LikePhoto.create({ user: user._id });
    return { token: user.createToken() };
  },
  signin: async (_, args, context) => {
    console.log("dasdfasdfasfdasdfasdf");
    console.log(args.token);
    try {
      let userInfo = await facebookAuth(args.token);
      // fullName: 'Dan Ish',
      // avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.12.50.50/p50x50/23473_100852346613669_7955230_n.jpg?oh=98ad9d3f5738bc3ecfa7516ca5c8b4f7&oe=5AE0875C',
      // email: 'anish_dhungel@yahoo.com',
      // providerData: { uid: '1258734010825491', provider: 'facebook' } }
      console.log(userInfo);
      let user = await User.findOne({ email: userInfo.email });
      // console.log(user);
      if (!user) {
        const [first_name, last_name] = userInfo.fullName.split(" ");

        user = await User.create({
          first_name,
          last_name,
          email: userInfo.email,
          avatar: userInfo.avatar,
          providerData: userInfo.providerData
        });
      }

      // console.log(userInfo);
      await LikePhoto.create({ user: user._id });

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User doesn't exist");
      }
      if (!user.authenticateUser(password)) {
        throw new Error("password didn't match");
      }
      return { token: user.createToken() };
    } catch (error) {
      throw error;
    }
  },
  me: async (_, args, { user }) => {
    if (user) {
      try {
        // console.log(user._id);
        const me = await User.findById(user);
        console.log(me);
        return me;
      } catch (e) {
        throw e;
      }
    } else {
      console.log("NO user found");
    }
  }
};
