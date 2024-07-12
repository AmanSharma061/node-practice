import jwt, {decode} from 'jsonwebtoken'

export const authMiddleWare = async (req, res, next) => {
	let token = req.headers.authorization.split(" ")[1];


	try {
		jwt.verify(token, process.env.SECRET, (err, decoded) => {

			if (err) {
				return res.status(401).json({
					error: true,
					message: err ?. message
				})
			}
			if (decoded) {
				next()
			}
		})
	} catch (error) {
		return res.status(401).json({error: true, message: "Something went wrong."})
	}
}
