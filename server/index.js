import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import url from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/post.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
// Config
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(cors());
app.use(morgan("common"));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// MongoDB

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Success + port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

if (process.env.NODE_ENV === "production") {
  app.use("/user", userRoutes);
  app.use("/posts", postRoutes);
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "app/client", "build", "index.html"));
  });
}

// Routes
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", upload.single("picture"), createPost);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
