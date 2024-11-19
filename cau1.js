const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const databaseName = "Nodejs";
const collectionName = "Employee";

const dataToInsert = [
  {
    name: "",
    email: "",
    position: "",
    salary: "",
  },
];
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    return collection.insertMany(dataToInsert);
  })
  .then((result) => {
    console.log(
      `${result.insertedCount} documents inserted into the collection in the "${databaseName}" database`
    );
  })
  .catch((err) => {
    console.log("Failed to connect to Database: ", err);
  })
  .finally(() => {
    client.close();
  });
