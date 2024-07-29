import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import router from "./routes/index.js";
import { connectDb } from "./database/connection.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false })); // encodes the URL-encoded data
consol.log("kncknk")
const PORT = 5000;
console.log(process.env.DATABASE_URL)
connectDb();
app.listen(PORT, () => {
  console.log(`Server listening on port`, PORT);
});
