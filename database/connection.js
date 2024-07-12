import mongoose from "mongoose";


export const connectDb = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017');
		console.log("Connected to DB Successfully.")
	} catch (error) {
		console.log(`Error connecting DB `, error ?. message)
	}
}
