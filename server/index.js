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
const PORT = 3001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Success + port:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.post("/auth/register", upload.single("picture"), register);
app.use("/post", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
