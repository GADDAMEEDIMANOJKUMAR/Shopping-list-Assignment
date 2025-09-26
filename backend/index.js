
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow frontend access

// Routes
const apiRoutes = require("./routes/app");
app.use("/api", apiRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

