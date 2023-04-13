"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const busstop_router_1 = __importDefault(require("./routers/busstop.router"));
dotenv_1.default.config();
const url = process.env.MONGO_DB_URI || "";
mongoose_1.default
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", busstop_router_1.default);
app.use("/api", user_router_1.default);
app.get("/api", (req, res) => {
    res.json({ message: "Success" });
});
app.listen(port, () => {
    console.log("Server is running on " + port);
});
