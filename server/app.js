import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.router.js";
import bookRouter from "./routes/book.router.js";
import borrowRouter from "./routes/borrow.router.js";
import userRouter from "./routes/user.router.js";
import expressFileUpload from "express-fileupload";

dotenv.config();

export const app = express();   

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/borrow", borrowRouter);
app.use("/api/user", userRouter);

connectDB();

app.use(errorHandler);
