const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Worker = require("./models/worker");
const User = require("./models/user");
const { adminAuthorization } = require("./middleware/authorize");
const { createJWT } = require("./utils/jwt");
const { comparePassword } = require("./utils/password");

const port = process.env.PORT || 5000;

const cors = require("cors");

// Connect to the MongoDB database
const url =
  "mongodb://isetsbz-server:34l9pKy2eJ1pGrnCveLuqhsWklHUNN8KzqUDx32tOvgXclvrO9plszLD2VFVc6NDuDkKv2PbUoaLACDbuRV8sA==@isetsbz-server.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@isetsbz-server@";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  // Compare the provided password with the hashed password
  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  // If the email and password are correct, create a JWT
  const token = createJWT({ data: { userId: user._id, email: user.email } });

  if (token) {
    // Send the token as a response
    res.json({ token, _id: user._id, email: user.email });
  } else {
    res.status(500).json({ error: "Token creation failed" });
  }
});

// Create a new worker
app.post("/worker", adminAuthorization, async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a worker by ID
app.put("/worker/:id", adminAuthorization, async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a worker by ID
app.delete("/worker/:id", adminAuthorization, async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.json({ message: "Worker deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single worker by ID
app.get("/worker/:id", adminAuthorization, async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all workers
app.get("/workers", adminAuthorization, async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port);
