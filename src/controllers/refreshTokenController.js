
import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";
const refreshTokenController = async (req, res) => {
  const { email, refreshToken } = req.body;

  try {
    const userExists = await User.findOne({ email, refreshToken });

    if (userExists) {
      let token = jwt.sign(
        {
          email
        },
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24
        }
      );
      userExists.refreshToken = token;
      await userExists.save();
      return res.status(200).json({ error: false, refreshToken: token });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: true, messgae: "Something went wrong." });
  }
};

export default refreshTokenController;
