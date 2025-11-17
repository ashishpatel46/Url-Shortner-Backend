import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.routes.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//  both localhost + vercel domain
app.use(
  cors({
    origin: [
      "https://url-shortner-frontend-gules.vercel.app",
      process.env.FRONTEND_URL // add deployed frontend domain in Vercel env
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

connectDB();

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);

app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to URL Shortener API");
});


export default app;
