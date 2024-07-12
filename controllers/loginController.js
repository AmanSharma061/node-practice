import User from "../database/models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {
	const {email, password} = req.body;

	if (!email) {
		return res.status(401).json({error: "Missing Email."});
	}
	if (!password) {
		return res.status(401).json({error: "Missing Password."});
	}

	try {
		const userExists = await User.findOne({email});

		if (! userExists) {
			return res.status(401).json({error: true, message: "User doesn't exist."});
		}

		const passwordMatch = await bcrypt.compare(password, userExists.password);

		if (! passwordMatch) {
			return res.status(401).json({error: true, message: "Incorrect password"});
		}

		const token = jwt.sign({
			email: userExists.email
		}, process.env.SECRET, {
			expiresIn: 120
		});

		userExists.refreshToken = token;
		await userExists.save();
 
		return res.status(200).json({error: false, token: token});
	} catch (error) {
		console.error("Error in loginController:", error);
		return res.status(500).json({error: true, message: "Internal server error"});
	}
};
