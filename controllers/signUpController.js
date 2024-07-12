import User from '../database/models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signUpController = async (req, res, next) => {

	const {email, password} = req.body
	if (!email) {
		return res.status(401).json({error: "Missing Email."})
	}
	if (!password) {
		return res.status(401).json({error: "Missing Password."})
	}
	try {

        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(200).json({error:true,message:"User Already Exists."})
        }
		const hashedPassword = await bcrypt.hash(password, 12)
		const response = await User.create({email, password: hashedPassword});
		if (response) {
		
			return res.status(200).json({error: false, message: "User created Successfully."})
            next()
		}
	} catch (error) {
		return res.status(401).json({error})
	}
}
