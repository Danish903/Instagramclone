import { decodeToken } from "../services/auth";

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (token) {
      const user = await decodeToken(token);
      req.user = user;
      console.log("REQ user: ", req.user);
      return next();
    }
    req.user = null;
    return next();
  } catch (error) {
    throw error;
  }
}

export default app => {
    app.use(auth);
};
