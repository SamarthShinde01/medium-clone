import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
	cors({
		origin: "*", // Allow all origins or specify frontend URL if you want to restrict
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.get("/", (req, res) => {
	return res.status(200).send("server is live..");
});

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
