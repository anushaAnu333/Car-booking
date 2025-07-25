// Safe seed script that only adds sample data if database is empty
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Please set MONGODB_URI in your .env.local file");
  process.exit(1);
}

// Sample data (only used if database is empty)
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

const sampleCars = [
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
    name: "BMW X3",
    type: "SUV",
    brand: "BMW",
    fuel: "70L",
    transmission: "Automatic",
    capacity: 6,
    price: 85,
    image: "/cars/placeholder.svg",
    isFavorite: false,
    isRecommended: true,
  },
];

async function safeSeed() {
  console.log("🌱 Starting SAFE database seeding...");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("carrental");

    // Check for existing data
    const existingCars = await db.collection("cars").countDocuments();
    const existingUsers = await db.collection("users").countDocuments();

    if (existingCars > 0 || existingUsers > 0) {
      console.log("ℹ️  Database already contains data:");
      console.log(`   - Cars: ${existingCars}`);
      console.log(`   - Users: ${existingUsers}`);
      console.log("✅ No seeding needed - your data is safe!");
      console.log("💡 Use 'npm run restore' to restore from backup if needed");
      return;
    }

    console.log("📝 Database is empty, adding sample data...");

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

    // Seed cars with availability fields
    console.log("🚗 Seeding sample cars...");
    const carsToInsert = sampleCars.map((car) => ({
      ...car,
      isFavorite: car.isFavorite || false,
      isRecommended: car.isRecommended || false,
      // Add availability fields
      isAvailable: true,
      availabilityStatus: "available",
      currentLocation: "1",
      locations: ["1", "2", "3"],
      images: [car.image],
      imagePublicIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const carResult = await db.collection("cars").insertMany(carsToInsert);
    console.log(`✅ Inserted ${carResult.insertedCount} sample cars`);

    console.log("🎉 Safe seeding completed successfully!");
    console.log("");
    console.log("Test credentials:");
    console.log("- Admin: admin@morent.com / admin123");
    console.log("- User: alex.stanton@example.com / password123");
    console.log("- User: skylar.dias@example.com / password123");
  } catch (error) {
    console.error("❌ Error in safe seeding:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

safeSeed();
