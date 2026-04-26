import Booking from "../models/Booking.js";

// CREATE a booking (User books a visit)
export const createBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { propertyId, agentId, date, time, message, phone } = req.body;

    if (!propertyId || !agentId || !date || !time || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if already booked
    const existing = await Booking.findOne({
      property: propertyId,
      user: userId,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return res.status(200).json({ success: false, message: "You already booked a visit for this property" });
    }

    const booking = await Booking.create({
      property: propertyId,
      user: userId,
      agent: agentId,
      date,
      time,
      message: message || "",
      phone,
    });

    res.status(201).json({ success: true, message: "Visit booked successfully!", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET bookings for a USER (my bookings)
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({ user: userId })
      .populate("property", "title location price image")
      .populate("agent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET bookings for an AGENT (bookings on my properties)
export const getAgentBookings = async (req, res) => {
  try {
    const agentId = req.userId;

    const bookings = await Booking.find({ agent: agentId })
      .populate("property", "title location price image")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE booking status (Agent confirms/cancels)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("property", "title location price image")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
