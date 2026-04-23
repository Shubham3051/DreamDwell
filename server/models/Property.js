// {
//   title: String,
//   description: String,
//   price: Number,
//   location: String,
//   images: [String],
//   vrImage: String,   // 360 image
//   vrModel: String,   // GLB (optional)
//   createdBy: ObjectId
// }

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const propertySchema = new Schema({
//   title: String,
//   description: String,
//   price: Number,
//   location: String,
//   images: [String],
//   vrImage: String,
//   vrModel: String,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Property", propertySchema);