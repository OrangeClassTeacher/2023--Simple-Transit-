import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connRoutes from "./routers/userConn.router"
import busRoutes from "./routers/busroute.router"
import userRoutes from "./routers/user.router"
import busStops from "./routers/busstop.router"
import messageRoutes from "./routers/messages.router"


dotenv.config()

const url: string = process.env.MONGO_DB_URI || ""

mongoose
  .connect(url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
const port = process.env.PORT;
app.use(express.json());





app.use("/api", busRoutes);
app.use("/api", userRoutes);
app.use("/api", busStops)
app.use("/api", connRoutes)
app.use("/api", messageRoutes)

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Success" });
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});