import User from "../database/models/userModel.js"

export const userController = async (re,res) => {
	try {
		const response = await User.find();
		if (response) {
			return res.status(200).json({users: response})
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({error: true, message: "Internal Server Error."})
	}
}
