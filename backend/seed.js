// Run with: npm run seed
// Creates two demo accounts in your MongoDB Atlas database:
//   Admin -> admin@localhost.academy / Admin@123
//   User  -> user@localhost.academy  / User@123
// Safe to re-run: it skips accounts that already exist.

require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const mongoose = require("mongoose");

const demoUsers = [
  {
    name: "Demo Admin",
    email: "admin@localhost.academy",
    password: "Admin@123",
    role: "admin",
  },
  {
    name: "Demo Student",
    email: "user@localhost.academy",
    password: "User@123",
    role: "user",
  },
];

const seed = async () => {
  await connectDB();

  for (const demoUser of demoUsers) {
    const existing = await User.findOne({ email: demoUser.email });
    if (existing) {
      console.log(`Skipped (already exists): ${demoUser.email}`);
      continue;
    }
    await User.create(demoUser);
    console.log(`Created: ${demoUser.email} / ${demoUser.password} (role: ${demoUser.role})`);
  }

  console.log("\nSeeding complete.");
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
