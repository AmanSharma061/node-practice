import express from 'express'
import bodyParser from 'body-parser';
import router from './routes/index.js';
import { connectDb } from './database/connection.js';
const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(router)
app.use(bodyParser.urlencoded({extended: false})); // encodes the URL-encoded data

const PORT = 5000;
connectDb()
app.listen(PORT, () => {
	console.log(`Server listening on port`, PORT)
})
