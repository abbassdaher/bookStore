const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const userPath = require("./routes/user");
const authPath = require("./routes/auth");
const mongoose = require("mongoose");
const logger = require("./middelwares/logger");
const { notFound, errorHandler } = require("./middelwares/error");
const dotENV = require("dotenv");
dotENV.config();

// connection with mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("connection faild to mongoDB", err);
  });

// app init
const app = express();

// apply middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/users", userPath);
app.use("/api/auths", authPath);

// Error not found
app.use(notFound);

// Error handler Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
