import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { connectDb } from "@/database/connection";
import router from "@/routes/index.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false })); // encodes the URL-encoded data

const PORT = process.env.PORT || 3000 ;

connectDb();
app.listen(PORT, () => {
  console.log(`Server listening on port`, PORT);
});
