import mongoose from "mongoose";
import Property from "./models/Property.js"; // 👈 adjust path if needed

const MONGO_URI = "mongodb+srv://sk30sk03_db_user:aFuNSdhDNAWkK853@cluster0.3srja1n.mongodb.net/DreamDwell?appName=Cluster0";

await mongoose.connect(MONGO_URI);
console.log("MongoDB Connected");

// 🧹 clear old data
await Property.deleteMany({});

// 🌱 seed data
const properties = [
  {
    title: "Modern Family House",
    location: "Ludhiana, Punjab",
    price: 8500000,
    image: [
      "https://www.google.com/search?tbm=isch&q=modern+house+india",
      "https://www.google.com/search?tbm=isch&q=house+interior+modern"
    ],
    beds: 3,
    baths: 3,
    sqft: 1800,
    type: "House",
    availability: "Buy",
    description: "Spacious 3BHK modern house with garden and parking.",
    amenities: ["Parking", "Garden", "Kitchen", "Security"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Ludhiana+Punjab",
    status: "active"
  },

  {
    title: "Luxury Apartment",
    location: "Chandigarh",
    price: 45000,
    image: [
      "https://www.google.com/search?tbm=isch&q=luxury+apartment+india"
    ],
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    availability: "Rent",
    description: "City view luxury apartment with gym access.",
    amenities: ["Gym", "Lift", "Power Backup"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Chandigarh",
    status: "active"
  },

  {
    title: "Independent Villa",
    location: "Amritsar, Punjab",
    price: 15000000,
    image: [
      "https://www.google.com/search?tbm=isch&q=luxury+villa+pool"
    ],
    beds: 4,
    baths: 4,
    sqft: 3200,
    type: "Villa",
    availability: "Buy",
    description: "Premium villa with private pool and garden.",
    amenities: ["Pool", "Garden", "Garage"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Amritsar",
    status: "active"
  },

  {
    title: "Studio Apartment",
    location: "Jalandhar",
    price: 12000,
    image: [
      "https://www.google.com/search?tbm=isch&q=studio+apartment+design"
    ],
    beds: 1,
    baths: 1,
    sqft: 450,
    type: "Apartment",
    availability: "Rent",
    description: "Perfect for students and singles.",
    amenities: ["WiFi", "Furnished"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Jalandhar",
    status: "active"
  },

  {
    title: "Luxury Penthouse",
    location: "Mohali",
    price: 22000000,
    image: [
      "https://www.google.com/search?tbm=isch&q=penthouse+city+view"
    ],
    beds: 5,
    baths: 5,
    sqft: 4000,
    type: "Penthouse",
    availability: "Buy",
    description: "Top-floor penthouse with skyline view.",
    amenities: ["Terrace", "Gym", "Pool"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Mohali",
    status: "active"
  },

  {
    title: "Budget 2BHK Flat",
    location: "Patiala",
    price: 18000,
    image: [
      "https://www.google.com/search?tbm=isch&q=2bhk+flat+india"
    ],
    beds: 2,
    baths: 2,
    sqft: 950,
    type: "Apartment",
    availability: "Rent",
    description: "Affordable flat near market.",
    amenities: ["Parking", "Security"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Patiala",
    status: "active"
  },

  {
    title: "Commercial Office Space",
    location: "Ludhiana, Punjab",
    price: 60000,
    image: [
      "https://www.google.com/search?tbm=isch&q=office+space+modern"
    ],
    beds: 0,
    baths: 2,
    sqft: 2000,
    type: "Commercial",
    availability: "Rent",
    description: "Ideal workspace for startups.",
    amenities: ["AC", "Parking", "Elevator"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Ludhiana+office",
    status: "active"
  },

  {
    title: "Farmhouse Retreat",
    location: "Kapurthala, Punjab",
    price: 9800000,
    image: [
      "https://www.google.com/search?tbm=isch&q=farmhouse+green+land"
    ],
    beds: 3,
    baths: 3,
    sqft: 5000,
    type: "Farmhouse",
    availability: "Buy",
    description: "Peaceful farmhouse with greenery.",
    amenities: ["Land", "Garden"],
    phone: "xxxxx xxxxx",
    googleMapLink: "https://maps.google.com/?q=Kapurthala",
    status: "active"
  }
];

// insert
await Property.insertMany(properties);

console.log("🌱 Database Seeded Successfully");

await mongoose.connection.close();