require("dotenv").config();
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const collection = mongoose.connection.collection("workspacefiles");
  const indexes = await collection.indexes();

  for (const name of ["workspaceId_1_name_1", "workspaceId_1"]) {
    if (indexes.some((index) => index.name === name)) {
      await collection.dropIndex(name);
      console.log(`Removed obsolete index: ${name}`);
    } else {
      console.log(`Index not found: ${name}`);
    }
  }

  console.log("Remaining indexes:");
  console.log(JSON.stringify(await collection.indexes(), null, 2));

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});