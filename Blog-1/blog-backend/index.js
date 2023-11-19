import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from 'cors'
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./Validation.js";
import {CheckAuth, handleValidationErrors} from "./utils/index.js";
import {UserController, PostController} from "./controllers/index.js";



mongoose
  .connect(
    "mongodb+srv://alikgaffarov1223:Alik.2002@cluster0.ry4gy2e.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();


const storage = multer.diskStorage({
  destination: (__, _, cb) => {
    cb(null, "uploads");
  },

  filename: (__, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/upload', express.static('uploads'));


app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.get("/tags", PostController.getLastTags);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.post("/upload", CheckAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", CheckAuth, PostController.remove);
app.patch(
  "/posts/:id",
  CheckAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
app.post(
  "/add-posts",
  CheckAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

app.get("/auth/me", CheckAuth, UserController.getMe);
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server Ok");
});
