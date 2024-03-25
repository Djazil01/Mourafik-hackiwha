import mongoose from "mongoose";

async function initDB(uri: string) {
  const connection = mongoose.connection;

  connection.on("connected", () => console.log("Connected to DB"));
  connection.on("error", (err) =>
    console.log(`Error connecting to DB: ${err}`)
  );
  connection.on("disconnected", () => console.log("Disconnected from DB"));
  connection.on("reconnected", () => console.log("Reconnected to DB"));

  await mongoose.connect(uri, {
    appName: "Hackiwha",
    dbName: "nameless-db",
    connectTimeoutMS: 2000, // for testing purposes
  });

  return true;
}

export { initDB };
