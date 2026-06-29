import Event from "../models/Event.js";
export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizerId: req.user.id,
      availableSeats: req.body.capacity,
      status: "pending",

    });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
export const getEvents = async (req, res, next) => {
  try {
    const {
      search,
      category,
      location,
      date,
      featured,
      status,
      upcoming,
      lastMinute,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    filter.status = status || "approved";

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (upcoming === "true") {
      filter.date = { $gte: new Date() };
    }

    if (lastMinute === "true") {
      const now = new Date();
      const after7Days = new Date();
      after7Days.setDate(now.getDate() + 7);

      filter.date = {
        $gte: now,
        $lte: after7Days,
      };

      filter.availableSeats = {
        $lte: 20,
      };
    }

    if (date) {
      filter.date = {
        $gte: new Date(date),
      };
    }

    const events = await Event.find(filter)
      .sort({ date: 1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};
export const getFeaturedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({
      featured: true,
      status: "approved",
    }).sort({ date: 1 });

    res.json({
      success: true,
      total: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    if (
      req.user.role !== "admin" &&
      event.organizerId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error("Event not found");
    }

    if (
      req.user.role !== "admin" &&
      event.organizerId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await event.deleteOne();

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "approved";
    await event.save();

    res.json({ message: "Event approved", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const toggleFeaturedEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.featured = !event.featured;

    await event.save();

    res.json({
      success: true,
      message: `Event ${
        event.featured ? "featured" : "unfeatured"
      } successfully`,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
