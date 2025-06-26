// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to MongoDB
mongoose.connect("mongodb+srv://dhanushvardhan6371:Dhanush2002@siri.1blhi3w.mongodb.net/resolvenow?retryWrites=true&w=majority&appName=siri")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Import schemas
const {
  ComplaintSchema,
  UserSchema,
  AssignedComplaint,
  MessageSchema,
} = require("./Schema");

// Setup Express
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

/****************** Messaging *******************************/
app.post("/messages", async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;
    const messageData = new MessageSchema({ name, message, complaintId });
    const messageSaved = await messageData.save();
    res.status(200).json(messageSaved);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/messages/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const messages = await MessageSchema.find({ complaintId }).sort("-createdAt");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

/****************** User Authentication *******************************/
app.post("/SignUp", async (req, res) => {
  const user = new UserSchema(req.body);
  try {
    const resultUser = await user.save();
    res.send(resultUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User doesn’t exist" });
  }
  if (user.password === password) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

/****************** Fetch Users *******************************/
app.get("/AgentUsers", async (req, res) => {
  try {
    const agentUsers = await UserSchema.find({ userType: "Agent" });
    if (agentUsers.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(agentUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/OrdinaryUsers", async (req, res) => {
  try {
    const users = await UserSchema.find({ userType: "Ordinary" });
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/AgentUsers/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    const user = await UserSchema.findOne({ _id: agentId });
    if (user && user.userType === "Agent") {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/****************** Delete User *******************************/
app.delete("/OrdinaryUsers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await UserSchema.deleteOne({ _id: id });
    await ComplaintSchema.deleteOne({ userId: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/****************** Complaints *******************************/
app.post("/Complaint/:id", async (req, res) => {
  const UserId = req.params.id;
  try {
    const user = await UserSchema.findById(UserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const complaint = new ComplaintSchema(req.body);
    const resultComplaint = await complaint.save();
    res.status(200).send(resultComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

app.get("/status/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const comment = await ComplaintSchema.find({ userId });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints" });
  }
});

app.get("/status", async (req, res) => {
  try {
    const complaint = await ComplaintSchema.find();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints" });
  }
});

/****************** Assign Complaints *******************************/
app.post("/assignedComplaints", async (req, res) => {
  try {
    const assignedComplaint = req.body;
    await AssignedComplaint.create(assignedComplaint);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: "Failed to add assigned complaint" });
  }
});

app.get("/allcomplaints/:agentId", async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const complaints = await AssignedComplaint.find({ agentId });
    const complaintIds = complaints.map((c) => c.complaintId);
    const complaintDetails = await ComplaintSchema.find({ _id: { $in: complaintIds } });

    const updatedComplaints = complaints.map((complaint) => {
      const detail = complaintDetails.find(
        (d) => d._id.toString() === complaint.complaintId.toString()
      );
      return {
        ...complaint._doc,
        name: detail?.name,
        city: detail?.city,
        state: detail?.state,
        address: detail?.address,
        pincode: detail?.pincode,
        comment: detail?.comment,
      };
    });

    res.json(updatedComplaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to get complaints" });
  }
});

/****************** Update Operations *******************************/
app.put("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, phone } = req.body;
    const user = await UserSchema.findByIdAndUpdate(
      _id,
      { name, email, phone },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
});

app.put("/complaint/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    if (!complaintId || !status) {
      return res.status(400).json({ error: "Missing complaintId or status" });
    }

    const updatedComplaint = await ComplaintSchema.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    const assigned = await AssignedComplaint.findOneAndUpdate(
      { complaintId },
      { status },
      { new: true }
    );

    if (!updatedComplaint && !assigned) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update complaint" });
  }
});

/****************** Start Server *******************************/
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
