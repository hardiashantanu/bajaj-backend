const express = require("express");
const multer = require("multer");
const bfhlRoutes = require("./routes/bfhlRoutes.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8800;

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Accept"], // Allowed headers
    credentials: true, // Allow cookies if necessary
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Use bfhl routes
app.use("/api", upload.single("file_b64"), bfhlRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
