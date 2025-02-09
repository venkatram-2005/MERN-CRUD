import express from 'express' ;
import dotenv from "dotenv" ;
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.route.js';
import path from "path" ;

dotenv.config() ;

const __dirname = path.resolve();
const app = express() ;
app.use(express.json()) ; // allow use of JSON data in req.body

app.use("/api/products", productRoutes) ;

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


const PORT = process.env.port || 5000
app.listen(PORT, ()=> {
    connectDB() ;
    console.log("Server started at http://localhost:"+PORT) ;
}) ;

