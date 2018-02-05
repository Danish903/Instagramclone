import jwt from "jsonwebtoken";
import User from "../models/User";

import constants from "../config/constants";

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error("You're not authorized");
  }
  const me = await User.findById(user._id);
  if (!me) {
    throw new Error("You're not authorized");
  }
  return me;
}

export const decodeToken = async token => {
  const arr = token.split(" ");
  try {
    let t = null;
    if (arr[0] === "Bearer") {
      t = await jwt.verify(arr[1], constants.JWT_SECRET);
    }
    return t;
  } catch (e) {
    throw new Error("NOT A valid token from server file auth.js");
  }
};
