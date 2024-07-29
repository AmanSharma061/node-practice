import User from "../database/models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
export const signUpController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(401).json({ error: "Missing Email." });
  }
  if (!password) {
    return res.status(401).json({ error: "Missing Password." });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json(new apiError("User Already Exists.", 401));
    }

    const response = await User.create({ email, password });
    if (response) {
      return res
        .status(200)
        .json(new apiResponse({ response }, "User created Successfully."));
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
};
