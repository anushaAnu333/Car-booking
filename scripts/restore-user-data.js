// Restore script to recover user's original car data from backup
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Please set MONGODB_URI in your .env.local file");
  process.exit(1);
}

async function restoreUserData() {
  console.log("🔄 Starting data restoration from backup...");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("carrental");

    // Read the user's original car data
    const backupFilePath = path.join(__dirname, "..", "bulk-cars-data.json");
    console.log("📁 Reading backup file:", backupFilePath);

    const backupData = JSON.parse(fs.readFileSync(backupFilePath, "utf8"));
    console.log(`📊 Found ${backupData.length} cars in backup file`);

    // Clear current data (which is just sample data)
    console.log("🗑️  Clearing sample data...");
    await db.collection("cars").deleteMany({});

    // Transform the user's data to include new availability fields
    console.log("🔧 Adding availability fields to your original cars...");
    const carsToRestore = backupData.map((car, index) => {
      // Generate some realistic availability statuses
      const statuses = [
        "available",
        "available",
        "available",
        "rented",
        "maintenance",
      ];
      const randomStatus = statuses[index % statuses.length];

      return {
        ...car,
        // Add the new availability fields while preserving all original data
        isAvailable: randomStatus === "available",
        availabilityStatus: randomStatus,
        currentLocation: String((index % 7) + 1), // Distribute across 7 locations
        locations: ["1", "2", "3"], // Available at multiple locations
        images: car.images || [car.image],
        imagePublicIds: car.imagePublicIds || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Insert all the user's cars back into MongoDB
    console.log("💾 Restoring your original car data to database...");
    const result = await db.collection("cars").insertMany(carsToRestore);
    console.log(`✅ Successfully restored ${result.insertedCount} cars!`);

    // Show some statistics
    const statusCounts = carsToRestore.reduce((acc, car) => {
      acc[car.availabilityStatus] = (acc[car.availabilityStatus] || 0) + 1;
      return acc;
    }, {});

    console.log("\n📊 Restoration Summary:");
    console.log(`✅ Total cars restored: ${carsToRestore.length}`);
    console.log("📈 Availability status distribution:");
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} cars`);
    });

    console.log("\n🎉 Data restoration completed successfully!");
    console.log(
      "🎯 All your original cars are back with new availability features!"
    );
    console.log(
      "🔗 You can now manage them at: http://localhost:3001/admin/cars"
    );
  } catch (error) {
    console.error("❌ Error restoring data:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

restoreUserData();
