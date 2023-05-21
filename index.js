/* All required Files */
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* Middleware's */
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w00ka8a.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    //   Database Collection
    const categoryCollection = client
      .db("happyBive")
      .collection("shopByCategory");

    const toysCollection = client.db("happyBive").collection("toys");

    /* Toys */
    app.get("/toys", async (req, res) => {
      const result = await toysCollection.find().toArray();
      res.send(result);
    });

    app.get("/toys/:id", async (req, res) => {
      const result = await toysCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.post("/toys", async (req, res) => {
      const result = await toysCollection.insertOne(req.body);
      res.send(result);
    });

    /* Sub Category */
    app.get("/subCategories", async (req, res) => {
      let query = {};

      if (req.query?.category) {
        query = {
          category: req.query.category,
        };
      }

      const result = await categoryCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The Server is Running");
});

app.listen(port, () => {
  console.log("The Server running on port: ${port}");
});
