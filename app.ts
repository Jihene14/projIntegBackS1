import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sequelize from "./database";
import passport from "passport";
import cors from "cors";

import { initPassport } from "./auth/passport";
import employeeRouter from "./routes/employe";
import calendarRouter from "./routes/calendrieremp";
import congeRouter from "./routes/DemandeConge";
var app = express();
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
const allowedOrigins = ["http://localhost:4200"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

initPassport(passport);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

sequelize.sync();

app.use("/employees", employeeRouter);
app.use("/calendar", calendarRouter);
app.use("/DemandeConge", congeRouter);
export default app;
