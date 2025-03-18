import HelpRequest from "../models/HelpRequest.js";

// Create a new help request
const createHelpRequest = async (req, res) => {
  const { title, description, urgency, location } = req.body;

  try {
    const newHelpRequest = await HelpRequest.create({
      title,
      description,
      urgency,
      location,
      createdBy: req.user.id,
    });

    res.status(201).json(newHelpRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all help requests with filters
const getAllHelpRequests = async (req, res) => {
  const { urgency, location } = req.query;
  let query = {};

  if (urgency) query.urgency = urgency;
  if (location) query.location = location;

  try {
    const helpRequests = await HelpRequest.find(query).populate("createdBy", "name");
    res.json(helpRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch a single help request
const getHelpRequestById = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findById(req.params.id).populate("createdBy", "name");
    if (!helpRequest) return res.status(404).json({ message: "Help request not found" });

    res.json(helpRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Volunteer for a help request
const volunteerForHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findById(req.params.id);
    if (!helpRequest) return res.status(404).json({ message: "Help request not found" });

    if (!helpRequest.volunteers.includes(req.user.id)) {
      helpRequest.volunteers.push(req.user.id);
      await helpRequest.save();
      return res.json({ message: "You have volunteered successfully", helpRequest });
    } else {
      return res.status(400).json({ message: "You are already a volunteer for this request" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete help request (Only Creator)
const deleteHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findById(req.params.id);
    if (!helpRequest) return res.status(404).json({ message: "Help request not found" });

    if (helpRequest.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await helpRequest.deleteOne();
    res.json({ message: "Help request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createHelpRequest, getAllHelpRequests, getHelpRequestById, volunteerForHelpRequest, deleteHelpRequest };
