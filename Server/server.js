require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDB = require("./utils/db");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// app.get("/", (req, res) => {
//     res.status(200).send("WELCOME");
// })

// app.get("/register", (req, res) => {
//     res.status(200).send("Register");
// })

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running");
  });
});
