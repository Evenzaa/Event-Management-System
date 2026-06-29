import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import Event from "./src/models/Event.js";
import Booking from "./src/models/Booking.js";
import Review from "./src/models/Review.js";
import Favorite from "./src/models/Favorite.js";
import Coupon from "./src/models/Coupon.js";

import connectDB from "./src/config/db.js";

dotenv.config();

await connectDB();

await User.deleteMany();
await Event.deleteMany();
await Booking.deleteMany();
await Review.deleteMany();
await Favorite.deleteMany();
await Coupon.deleteMany();
const password = await bcrypt.hash("123456", 10);

// ==========================
// Admin
// ==========================

const admin = await User.create({
  name: "Evenza Team",
  email: "evenza20@gmail.com",
  password:"123456",
  role: "user",
});

// ==========================
// Organizers
// ==========================

const organizer1 = await User.create({
  name: "Sara Mostafa",
  email: "goriiigoriii56@gmail.com.com",
  password:"123456",
  role: "organizer",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

const organizer2 = await User.create({
  name: "Samia Magdi",
  email: "gpt958319@gmail.com",
  password:"123456",
  role: "organizer",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

// ==========================
// Users
// ==========================

const user1 = await User.create({
  name: "Alia Hassan",
  email: "hayammostafa545@gmail.com",
  password:"123456",
  role: "user",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

const user2 = await User.create({
  name: "Mona Ahmed",
  email: "gorigori112002@gmail.com",
   password:"123456",
  role: "user",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

const user3 = await User.create({
  name: "Omar Khaled",
  email: "hageralaa112234@gmail.com",
   password:"123456",
  role: "user",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

const user4 = await User.create({
  name: "Nour Mohamed",
  email: "goriiigorii284@gmail.com",
   password:"123456",
  role: "user",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

const user5 = await User.create({
  name: "Youssef Adel",
  email: "programmerhager@gmail.com",
   password:"123456",
  role: "user",
  isVerified: true,
  profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
});

const user6 = await User.create({
  name: "Fatma Samir",
  email: "hayammostafa712@gmail.com",
  password:"123456",
  role: "user",
  isVerified: true,
  profileImage:
      "https://randomuser.me/api/portraits/women/3.jpg",
});


// ==========================
// Events
// ==========================

const event1 = await Event.create({
  title: "Tech Conference 2026",
  description: "Annual technology conference.",
  category: "Technology",
  location: "Cairo",
  date: new Date("2026-12-10"),
  price: 250,
  capacity: 100,
  availableSeats: 15,
  organizerId: organizer1._id,
  status: "approved",
  featured: true,
  images: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  ],
  tags: ["tech", "conference"],
});

const event2 = await Event.create({
  title: "AI Summit",
  description: "Artificial Intelligence Summit.",
  category: "Technology",
  location: "Alexandria",
  date: new Date("2026-11-15"),
  price: 300,
  capacity: 150,
  availableSeats: 60,
  organizerId: organizer1._id,
  status: "approved",
  featured: true,
  images: [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  ],
  tags: ["AI", "Machine Learning"],
});
const event3 = await Event.create({
  title: "Cairo Music Festival",
  description: "Live music festival.",
  category: "Music",
  location: "Cairo",
  date: new Date("2026-09-20"),
  price: 180,
  capacity: 300,
  availableSeats: 120,
  organizerId: organizer2._id,
  status: "approved",
  featured: true,
  images: [
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
  ],
  tags: ["music", "festival"],
});

const event4 = await Event.create({
  title: "Jazz Night",
  description: "Enjoy a wonderful jazz evening.",
  category: "Music",
  location: "Giza",
  date: new Date("2025-12-20"),
  price: 120,
  capacity: 80,
  availableSeats: 0,
  organizerId: organizer2._id,
  status: "completed",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  ],
  tags: ["jazz", "live"],
});

const event5 = await Event.create({
  title: "Football Championship",
  description: "National football championship.",
  category: "Sports",
  location: "Cairo",
  date: new Date("2026-08-15"),
  price: 350,
  capacity: 500,
  availableSeats: 90,
  organizerId: organizer1._id,
  status: "approved",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
  ],
  tags: ["football", "sports"],
});

const event6 = await Event.create({
  title: "Marathon 2026",
  description: "Annual city marathon.",
  category: "Sports",
  location: "Alexandria",
  date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  price: 100,
  capacity: 200,
  availableSeats: 10,
  organizerId: organizer1._id,
  status: "approved",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
  ],
  tags: ["running", "marathon"],
});

const event7 = await Event.create({
  title: "Startup Expo",
  description: "Meet startups and investors.",
  category: "Business",
  location: "Cairo",
  date: new Date("2026-11-05"),
  price: 220,
  capacity: 180,
  availableSeats: 55,
  organizerId: organizer2._id,
  status: "approved",
  featured: true,
  images: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  ],
  tags: ["startup", "business", "entrepreneurship"],
});

const event8 = await Event.create({
  title: "Marketing Bootcamp",
  description: "Digital Marketing Training.",
  category: "Business",
  location: "Mansoura",
  date: new Date("2026-10-18"),
  price: 170,
  capacity: 120,
  availableSeats: 120,
  organizerId: organizer2._id,
  status: "pending",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978",
  ],
  tags: ["marketing", "business"],
});

const event9 = await Event.create({
  title: "Art Gallery Opening",
  description: "Modern Art Exhibition.",
  category: "Art",
  location: "Alexandria",
  date: new Date("2026-09-10"),
  price: 80,
  capacity: 100,
  availableSeats: 35,
  organizerId: organizer1._id,
  status: "approved",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
  ],
  tags: ["art", "gallery"],
});

const event10 = await Event.create({
  title: "Photography Workshop",
  description: "Photography for beginners.",
  category: "Art",
  location: "Cairo",
  date: new Date("2026-08-12"),
  price: 150,
  capacity: 60,
  availableSeats: 28,
  organizerId: organizer1._id,
  status: "ongoing",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
  ],
  tags: ["photography", "camera"],
});

const event11 = await Event.create({
  title: "English Workshop",
  description: "Improve your English speaking skills.",
  category: "Education",
  location: "Tanta",
  date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  price: 90,
  capacity: 40,
  availableSeats: 18,
  organizerId: organizer2._id,
  status: "approved",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  ],
  tags: ["english", "education"],
});
 const event12 = await Event.create({
  title: "Programming Bootcamp",
  description: "Full Stack Development Bootcamp.",
  category: "Education",
  location: "Cairo",
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  price: 350,
  capacity: 50,
  availableSeats: 10,
  organizerId: organizer2._id,
  status: "approved",
  featured: false,
  images: [
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  ],
  tags: ["programming", "javascript", "nodejs"],
});


// ==========================
// Bookings
// ==========================

await Booking.insertMany([
  {
    userId: user1._id,
    eventId: event1._id,
    quantity: 2,
    totalPrice: event1.price * 2,
    status: "confirmed",
  },
  {
    userId: user2._id,
    eventId: event1._id,
    quantity: 1,
    totalPrice: event1.price,
    status: "confirmed",
  },
  {
    userId: user3._id,
    eventId: event2._id,
    quantity: 3,
    totalPrice: event2.price * 3,
    status: "confirmed",
  },
  {
    userId: user4._id,
    eventId: event3._id,
    quantity: 2,
    totalPrice: event3.price * 2,
    status: "confirmed",
  },
  {
    userId: user5._id,
    eventId: event4._id,
    quantity: 1,
    totalPrice: event4.price,
    status: "confirmed",
  },
  {
    userId: user6._id,
    eventId: event5._id,
    quantity: 4,
    totalPrice: event5.price * 4,
    status: "confirmed",
  },
  {
    userId: user1._id,
    eventId: event7._id,
    quantity: 2,
    totalPrice: event7.price * 2,
    status: "confirmed",
  },
  {
    userId: user2._id,
    eventId: event8._id,
    quantity: 1,
    totalPrice: event8.price,
    status: "confirmed",
  },
  {
    userId: user3._id,
    eventId: event9._id,
    quantity: 2,
    totalPrice: event9.price * 2,
    status: "confirmed",
  },
  {
    userId: user4._id,
    eventId: event10._id,
    quantity: 1,
    totalPrice: event10.price,
    status: "confirmed",
  },
  {
    userId: user5._id,
    eventId: event11._id,
    quantity: 2,
    totalPrice: event11.price * 2,
    status: "confirmed",
  },
  {
    userId: user6._id,
    eventId: event12._id,
    quantity: 1,
    totalPrice: event12.price,
    status: "confirmed",
  },
  
  {
    userId: user1._id,
    eventId: event3._id,
    quantity: 1,
    totalPrice: event3.price,
    status: "confirmed",
  },
  {
    userId: user2._id,
    eventId: event5._id,
    quantity: 2,
    totalPrice: event5.price * 2,
    status: "confirmed",
  },
  {
    userId: user3._id,
    eventId: event6._id,
    quantity: 1,
    totalPrice: event6.price,
    status: "confirmed",
  },
  {
    userId: user4._id,
    eventId: event7._id,
    quantity: 3,
    totalPrice: event7.price * 3,
    status: "confirmed",
  },
  {
    userId: user5._id,
    eventId: event11._id,
    quantity: 1,
    totalPrice: event11.price,
    status: "confirmed",
  },
  {
    userId: user6._id,
    eventId: event12._id,
    quantity: 2,
    totalPrice: event12.price * 2,
    status: "cancelled",
  },
]);

// ==========================
// Reviews
// ==========================

await Review.insertMany([
  {
    userId: user1._id,
    eventId: event1._id,
    rating: 5,
    comment: "Excellent event, very organized!",
  },
  {
    userId: user2._id,
    eventId: event1._id,
    rating: 4,
    comment: "Great speakers and venue.",
  },

  {
    userId: user3._id,
    eventId: event2._id,
    rating: 5,
    comment: "AI content was amazing.",
  },
  {
    userId: user4._id,
    eventId: event2._id,
    rating: 4,
    comment: "Learned a lot.",
  },

  {
    userId: user5._id,
    eventId: event3._id,
    rating: 5,
    comment: "Fantastic music festival!",
  },
  {
    userId: user6._id,
    eventId: event3._id,
    rating: 4,
    comment: "Loved the atmosphere.",
  },
 
  {
    userId: user1._id,
    eventId: event4._id,
    rating: 2,
    comment: "Sound quality wasn't great.",
  },

  {
    userId: user2._id,
    eventId: event5._id,
    rating: 5,
    comment: "Amazing football event.",
  },
  {
    userId: user3._id,
    eventId: event5._id,
    rating: 4,
    comment: "Very exciting.",
  },

  {
    userId: user4._id,
    eventId: event6._id,
    rating: 5,
    comment: "Well organized marathon.",
  },
  {
    userId: user5._id,
    eventId: event6._id,
    rating: 5,
    comment: "Can't wait for next year!",
  },

  {
    userId: user6._id,
    eventId: event7._id,
    rating: 4,
    comment: "Helpful networking.",
  },

  {
    userId: user1._id,
    eventId: event8._id,
    rating: 3,
    comment: "Still waiting for approval.",
  },

  {
    userId: user2._id,
    eventId: event9._id,
    rating: 5,
    comment: "Beautiful artwork.",
  },
  {
    userId: user3._id,
    eventId: event9._id,
    rating: 4,
    comment: "Nice exhibition.",
  },

  {
    userId: user4._id,
    eventId: event10._id,
    rating: 5,
    comment: "Photography tips were useful.",
  },

  {
    userId: user5._id,
    eventId: event11._id,
    rating: 4,
    comment: "Improved my English.",
  },
  {
    userId: user6._id,
    eventId: event11._id,
    rating: 5,
    comment: "Excellent instructor.",
  },

  {
    userId: user1._id,
    eventId: event12._id,
    rating: 4,
    comment: "Very practical course.",
  },
]);

console.log("Reviews created...");
// ==========================
// Favorites
// ==========================

await Favorite.insertMany([
  // User 1
  {
    userId: user1._id,
    eventId: event1._id,
  },
  {
    userId: user1._id,
    eventId: event2._id,
  },
  {
    userId: user1._id,
    eventId: event7._id,
  },

  // User 2
  {
    userId: user2._id,
    eventId: event5._id,
  },
  {
    userId: user2._id,
    eventId: event3._id,
  },

  // User 3
  {
    userId: user3._id,
    eventId: event7._id,
  },
  {
    userId: user3._id,
    eventId: event11._id,
  },

  // User 4
  {
    userId: user4._id,
    eventId: event3._id,
  },
  {
    userId: user4._id,
    eventId: event12._id,
  },

  // User 5
  {
    userId: user5._id,
    eventId: event6._id,
  },
  {
    userId: user5._id,
    eventId: event9._id,
  },

  // User 6
  {
    userId: user6._id,
    eventId: event1._id,
  },
  {
    userId: user6._id,
    eventId: event11._id,
  },
]);

console.log("Favorites created...");


 // ==========================
// Coupons
// ==========================

await Coupon.insertMany([
  {
    code: "WELCOME20",
    discount: 20,
    expiresAt: new Date("2027-12-31"),
    isActive: true,
  },
  {
    code: "SUMMER15",
    discount: 15,
    expiresAt: new Date("2027-08-31"),
    isActive: true,
  },
  {
    code: "VIP30",
    discount: 30,
    expiresAt: new Date("2027-12-31"),
    isActive: true,
  },
  {
    code: "STUDENT10",
    discount: 10,
    expiresAt: new Date("2027-06-30"),
    isActive: true,
  },
  {
    code: "NEWUSER25",
    discount: 25,
    expiresAt: new Date("2027-03-31"),
    isActive: true,
  },
  {
    code: "SPRING20",
    discount: 20,
    expiresAt: new Date("2027-05-31"),
    isActive: true,
  },

  // Expired Coupons
  {
    code: "EXPIRED10",
    discount: 10,
    expiresAt: new Date("2024-12-31"),
    isActive: false,
  },
  {
    code: "OLD50",
    discount: 50,
    expiresAt: new Date("2023-01-01"),
    isActive: false,
  },
]);


await mongoose.connection.close();
try{
console.log("MongoDB connection closed.");
process.exit(0);

} catch (error) {
  console.error("Seed failed!");
  console.error(error);

  process.exit(1);
}
seedData();
