import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import constants from "../config/constants";

const UserSchema = new Schema(
  {
    username: { type: String },
    avatar: String,
    avatar: String,
    email: { type: String, unique: true },
    first_name: String,
    last_name: String,
    password: String,
    providerData: {
      uid: String,
      provider: String
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    );
  }
};
export default mongoose.model("User", UserSchema);

//APPID: 416342462128671

//AAPPSECRET: 72202b4dd68fb464300542e57c405dd2
