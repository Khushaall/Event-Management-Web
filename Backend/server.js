const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const Event = require("./models/Event"); // Import the Event model
const ServiceProvider = require("./models/ServiceProvider"); // Import the ServiceProvider model

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/eventApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
// Middleware
app.use(cors());
app.use(bodyParser.json());

let users = [];

const JWT_SECRET = "your_jwt_secret";


app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get("/api/mainpage", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.json({ message: "Welcome to the MainPage" });
  });
});

// New Route: Fetch Events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// New Route: Create Event
app.post("/api/events", async (req, res) => {
  try {
    const { type, host, location, date, description ,live} = req.body;

    const event = new Event({
      type,
      host,
      location,
      date,
      description,
      userId: new mongoose.Types.ObjectId(),
      live,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});

// New Route: Add Service Provider
app.post("/api/serviceprovider", async (req, res) => {
  const { name, company, email, phone, service, location } = req.body;

  try {
    const newServiceProvider = new ServiceProvider({
      name,
      company,
      email,
      phone,
      service,
      location,
    });

    await newServiceProvider.save();
    res
      .status(201)
      .json({ message: "Service Provider added successfully", newServiceProvider });
  } catch (error) {
    console.error("Error adding service provider:", error);
    res.status(500).json({ message: "Failed to add service provider" });
  }
});

// New Route: Add User to Event's ServiceProviderIds
app.post("/api/events/:eventId/participate", async (req, res) => {
  const { eventId } = req.params;
  const userId = "6752702fcd0e5564149acf77"; // Hardcoded User ID

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the userId to the serviceProviderIds array if not already present
    if (!event.serviceProviderIds.includes(userId)) {
      event.serviceProviderIds.push(userId);
      await event.save();
      return res.status(200).json({ message: "User added to event's service providers" });
    }

    res.status(400).json({ message: "User is already a service provider for this event" });
  } catch (error) {
    console.error("Error adding user to event:", error);
    res.status(500).json({ message: "Failed to add user to event" });
  }
});

app.get("/api/eventssep", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
