const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Cart = require("./models/Cart");
const Checkout = require("./models/Checkout");
const Order = require("./models/Order");
const Product = require("./models/Product");
const Subscriber = require("./models/Subscriber");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Checkout.deleteMany();
    await Order.deleteMany();
    await Subscriber.deleteMany();

    // Create a default admin User
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data saved successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data: ", error);
    process.exit(1);
  }
};

seedData();
