const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS (allow frontend)
app.use(cors());

// ✅ JSON parser
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running on 7501");
});

// ✅ ROUTES
app.use("/api/team", require("./routes/team"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tournament", require("./routes/tournament"));

// ✅ CONNECT DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// ✅ START SERVER
app.listen(7501, () => {
  console.log("🚀 Server running on port 7501");
});