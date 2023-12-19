import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./Config/db.js";
import bodyParser from "body-parser";
import userRoutes from './Routes/userRoutes.js';
import adminPanel from "./Routes/categoryRoutes.js";
import productsRouter from "./Routes/productRoutes.js";


const app = express();
/** CNFIGURE THE DOTENV */
dotenv.config();
const PORT = process.env.PORT;

/**IMPORT THE DB CONNECTION */
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**CORS */
// app.use(cors());
  app.use(cors());

/**API HOME END POINT */
app.get('/',(req, res) => {
    return res.status(200).json({
        message: "API RUNNING SUCCESSFULLY!!!"
    });
});

/** import the and use the sub router */
app.use('/api/auth', userRoutes);
app.use('/api/adminPanel', adminPanel);
app.use('/api/products', productsRouter);

/** SERVER LISTEN WITH PORT NUMBER */
app.listen(PORT, () => {
    console.log(`SERVER STARTED : ${PORT}`.bold.yellow);
});