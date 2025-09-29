const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("backend/models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  await Admin.create({ name: "Super Admin", email: "admin@test.com", password: hashed });
  console.log("Admin seeded");
  process.exit();
});
