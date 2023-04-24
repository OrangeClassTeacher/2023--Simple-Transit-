import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import busRoutes from "./routers/busroute.router"
import userRoutes from "./routers/user.router"
import busStops from "./routers/busstop.router"
// const cors = require("cors");
// const dotenv = require("dotenv")
// const busRoutes = require("./routers/busstop.router") 

 
dotenv.config()

const url: string = process.env.MONGO_DB_URI || ""

mongoose
  .connect(url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api", busRoutes);
app.use("/api", userRoutes);
app.use("/api", busStops)

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Success" });
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});