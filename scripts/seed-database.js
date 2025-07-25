// Seed script to populate MongoDB with initial data
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Please set MONGODB_URI in your .env.local file");
  process.exit(1);
}

// Sample data
const users = [
  {
    email: "admin@morent.com",
    password: "admin123",
    name: "Admin User",
    phone: "+1234567890",
    avatar: "/user-avatar.svg",
    role: "admin",
  },
  {
    email: "alex.stanton@example.com",
    password: "password123",
    name: "Alex Stanton",
    phone: "+1234567891",
    avatar: "/user-avatar.svg",
    role: "user",
  },
  {
    email: "skylar.dias@example.com",
    password: "password123",
    name: "Skylar Dias",
    phone: "+1234567892",
    avatar: "/user-avatar.svg",
    role: "user",
  },
];

const cars = [
  {
    name: "Koenigsegg",
    type: "Sport",
    brand: "Koenigsegg",
    fuel: "90L",
    transmission: "Manual",
    capacity: 2,
    price: 99,
    image: "/cars/placeholder.svg",
    isFavorite: true,
    isRecommended: true,
  },
  {
    name: "Nissan GT - R",
    type: "Sport",
    brand: "Nissan",
    fuel: "80L",
    transmission: "Manual",
    capacity: 2,
    price: 80,
    originalPrice: 100,
    image: "/cars/placeholder.svg",
    isFavorite: false,
    isRecommended: false,
  },
  {
    name: "Rolls - Royce",
    type: "Sport",
    brand: "Rolls-Royce",
    fuel: "70L",
    transmission: "Manual",
    capacity: 4,
    price: 96,
    image: "/cars/placeholder.svg",
    isFavorite: true,
    isRecommended: false,
  },
  {
    name: "All New Rush",
    type: "SUV",
    brand: "Toyota",
    fuel: "70L",
    transmission: "Manual",
    capacity: 6,
    price: 72,
    originalPrice: 80,
    image: "/cars/placeholder.svg",
    isFavorite: false,
    isRecommended: false,
  },
  {
    name: "CR - V",
    type: "SUV",
    brand: "Honda",
    fuel: "80L",
    transmission: "Manual",
    capacity: 6,
    price: 80,
    image: "/cars/placeholder.svg",
    isFavorite: true,
    isRecommended: false,
  },
  {
    name: "All New Terios",
    type: "SUV",
    brand: "Daihatsu",
    fuel: "90L",
    transmission: "Manual",
    capacity: 6,
    price: 74,
    image: "/cars/placeholder.svg",
    isFavorite: false,
    isRecommended: false,
  },
  {
    name: "MG ZX Exclusice",
    type: "Hatchback",
    brand: "MG",
    fuel: "70L",
    transmission: "Electric",
    capacity: 4,
    price: 76,
    originalPrice: 80,
    image: "/cars/placeholder.svg",
    isFavorite: false,
    isRecommended: false,
  },
  {
    name: "New MG ZS",
    type: "SUV",
    brand: "MG",
    fuel: "80L",
    transmission: "Manual",
    capacity: 6,
    price: 80,
    image: "/cars/placeholder.svg",
    isFavorite: false,
    isRecommended: false,
  },
  {
    name: "MG ZX Excite",
    type: "Hatchback",
    brand: "MG",
    fuel: "90L",
    transmission: "Electric",
    capacity: 4,
    price: 74,
    image: "/cars/placeholder.svg",
    isFavorite: true,
    isRecommended: false,
  },
];

async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  // Check if there's existing data
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("carrental");

    // Check for existing data
    const existingCars = await db.collection("cars").countDocuments();
    const existingUsers = await db.collection("users").countDocuments();

    if (existingCars > 0 || existingUsers > 0) {
      console.log("⚠️  WARNING: Database contains existing data!");
      console.log(`   - Cars: ${existingCars}`);
      console.log(`   - Users: ${existingUsers}`);
      console.log("⚠️  This will DELETE ALL existing data!");
      console.log(
        "💡 Use 'npm run restore' instead to restore your original data"
      );
      console.log("🛑 Aborting to prevent data loss...");
      return;
    }

    // Clear existing data (only if no data exists)
    console.log("🗑️  Clearing existing data...");
    await db.collection("users").deleteMany({});
    await db.collection("cars").deleteMany({});

    // Seed users with hashed passwords
    console.log("👥 Seeding users...");
    const usersToInsert = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    const userResult = await db.collection("users").insertMany(usersToInsert);
    console.log(`✅ Inserted ${userResult.insertedCount} users`);

    // Seed cars
    console.log("🚗 Seeding cars...");
    const carsToInsert = cars.map((car) => ({
      ...car,
      isFavorite: car.isFavorite || false,
      isRecommended: car.isRecommended || false,
      // Add availability fields
      isAvailable: true,
      availabilityStatus: "available",
      currentLocation: "1", // Default to first location
      locations: ["1", "2", "3"], // Available at multiple locations
      images: [car.image],
      imagePublicIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const carResult = await db.collection("cars").insertMany(carsToInsert);
    console.log(`✅ Inserted ${carResult.insertedCount} cars`);

    console.log("🎉 Database seeding completed successfully!");
    console.log("");
    console.log("Test credentials:");
    console.log("- Admin: admin@morent.com / admin123");
    console.log("- User: alex.stanton@example.com / password123");
    console.log("- User: skylar.dias@example.com / password123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seedDatabase();
