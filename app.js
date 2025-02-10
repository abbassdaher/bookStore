const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");

// connection with mongoDB
mongoose.connect("mongodb://localhost/bookStoreDB").then(() => {
  console.log("connected to MongoDB");
}).catch(() => {console.log("connection faild to mongoDB");

  
}
)

// app init
const app = express();

// apply middlewares
app.use(express.json());

// Routes
app.use("/api/books", booksPath);
app.use("/api/author", authorsPath);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
