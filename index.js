const express = require("express");
const cors = require("cors");
const mongooose = require("mongoose");
const dotenv = require("dotenv")
const busRoutes = require("./routers/busstop.router")

dotenv.config()
mongooose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api", busRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Success" });
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});