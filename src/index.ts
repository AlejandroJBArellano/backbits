import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import router from "./router";
import cors from "cors";

dotenv.config();

const app = express();
import("./database");

app.set("port", process.env.PORT || 3000);

app.use(cors({
    origin: process.env.PETITION,
}));
app.use(morgan(process.env.MORGAN_LOG as string));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.use("/", (req,res) => res.json({ message: "Hello World" }));
app.use(router)

app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));