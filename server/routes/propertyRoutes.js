const router = require("express").Router();
const Property = require("../models/Property");

// Create Property
router.post("/", async (req, res) => {
  const property = new Property(req.body);
  await property.save();
  res.json(property);
});

// Get All
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

module.exports = router;