import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {

	try {
		await mongoose.connect(`${process.env.DATABASE_URL}`);
		console.log("Connected to DB Successfully.")
	} catch (error) {
		console.log(`Error connecting DB `, error ?. message)
	}
}
