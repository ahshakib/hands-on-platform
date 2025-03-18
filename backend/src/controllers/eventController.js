import Event from "../models/Event.js";

// Create a new event
const createEvent = async (req, res) => {
  const { title, description, date, time, location, category } = req.body;

  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all events with filters
const getAllEvents = async (req, res) => {
  const { category, location } = req.query;
  let query = {};

  if (category) query.category = category;
  if (location) query.location = location;

  try {
    const events = await Event.find(query).populate("createdBy", "name");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch single event
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Join an event
const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
      return res.json({ message: "Joined event successfully", event });
    } else {
      return res.status(400).json({ message: "You are already attending this event" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete event (Only Creator)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createEvent, getAllEvents, getEventById, joinEvent, deleteEvent };
