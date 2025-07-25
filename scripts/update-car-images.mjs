import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// You'll need to get a free API key from https://unsplash.com/developers
const UNSPLASH_ACCESS_KEY = "ED9no3ytedxP9CrIJgrYSJrew5u4pBAl7Wqnw8VXnys"; // Your actual Unsplash Access Key

const carImageQueries = {
  Koenigsegg: "koenigsegg supercar",
  "Nissan GT - R": "nissan gtr sports car",
  "Rolls - Royce": "rolls royce luxury car",
  "All New Rush": "toyota rush suv",
  "CR - V": "honda crv suv",
  "All New Terios": "daihatsu terios suv",
  "MG ZX Exclusive": "mg zs hatchback",
  "New MG ZS": "mg zs suv",
  "MG ZX Excite": "mg zs compact car",
  "BMW M3": "bmw m3 sedan",
  "Mercedes AMG": "mercedes amg coupe",
  "Toyota Camry": "toyota camry sedan",
  "Honda Civic": "honda civic hatchback",
  "Ford Explorer": "ford explorer suv",
  "Chevrolet Tahoe": "chevrolet tahoe suv",
  "Mazda MX-5": "mazda mx5 roadster",
  "Audi R8": "audi r8 supercar",
};

async function fetchCarImage(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image for "${query}":`, error.message);
    return null;
  }
}

async function updateCarImages() {
  console.log("🚗 Starting car image update process...");

  // Read the current cars.ts file
  const carsFilePath = path.join(__dirname, "../src/data/cars.ts");
  let carsContent = fs.readFileSync(carsFilePath, "utf8");

  // Extract car names and update images
  const carNames = Object.keys(carImageQueries);

  for (const carName of carNames) {
    console.log(`📸 Fetching image for: ${carName}`);

    const query = carImageQueries[carName];
    const imageUrl = await fetchCarImage(query);

    if (imageUrl) {
      // Replace the placeholder image with the fetched image URL
      const regex = new RegExp(
        `(name: "${carName}"[\\s\\S]*?image: ")([^"]*)(")`,
        "g"
      );
      carsContent = carsContent.replace(regex, `$1${imageUrl}$3`);
      console.log(`✅ Updated image for ${carName}`);
    } else {
      console.log(`❌ Failed to fetch image for ${carName}`);
    }

    // Add a small delay to respect API rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Write the updated content back to the file
  fs.writeFileSync(carsFilePath, carsContent);
  console.log("🎉 Car images updated successfully!");
}

// Run the script
updateCarImages().catch(console.error);
