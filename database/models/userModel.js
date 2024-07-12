import mongoose, {Schema} from "mongoose";

const useSchema = Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	refreshToken: {
		type: String
	}
})


const User = mongoose.model('User', useSchema);


export default User
