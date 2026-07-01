const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(express.json());

const userRoute = require("./routes/user.js");
const postRoute = require("./routes/post.js");
app.use("/users", userRoute);
app.use("/posts", postRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose running!"))
  .catch((err) => console.log("error:", err));

app.listen(PORT, () => {
  console.log(`Listening to PORT:${PORT}`);
});
