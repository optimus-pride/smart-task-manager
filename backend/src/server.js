import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";


dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.send("smart task management api is running");
});

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
