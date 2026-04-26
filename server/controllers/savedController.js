import User from "../models/User.js";

// SAVE a property
export const saveProperty = async (req, res) => {
  try {
    const userId = req.userId;
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ success: false, message: "propertyId is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.savedProperties.includes(propertyId)) {
      return res.status(200).json({ success: false, message: "Already saved" });
    }

    user.savedProperties.push(propertyId);
    await user.save();

    res.status(200).json({ success: true, message: "Property saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UNSAVE a property
export const unsaveProperty = async (req, res) => {
  try {
    const userId = req.userId;
    const { propertyId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.savedProperties = user.savedProperties.filter(
      (id) => id.toString() !== propertyId
    );
    await user.save();

    res.status(200).json({ success: true, message: "Property removed from saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET saved properties
export const getSavedProperties = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate({
      path: "savedProperties",
      populate: { path: "postedBy", select: "name email" },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json(user.savedProperties);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
