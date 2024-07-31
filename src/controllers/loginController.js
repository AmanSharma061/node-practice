import User from "@/database/models/userModel";
import { apiError } from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(401).json(new apiError("Missing Email", 401));
  }
  if (!password) {
    return res.status(401).json(new apiError("Missing Password", 401));
  }

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json(new apiError("User doesn't Password", 401));
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(401).json(new apiError("Invalid Password", 401));
    }

    const token = jwt.sign(
      {
        email: userExists.email
      },
      process.env.SECRET,
      {
        expiresIn: 120
      }
    );
    const refreshToken = jwt.sign(
      { data: userExists.password },
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 30
      }
    );
    userExists.refreshToken = refreshToken;
    await userExists.save();

    return res
      .status(200)
      .json(
        new apiResponse(
          { token: token, refreshToken: refreshToken },
          "Logged in successfully."
        )
      );
  } catch (error) {
    console.error("Error in loginController:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
