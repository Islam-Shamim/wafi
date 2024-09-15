const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

//middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

//connect with mongo
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xl5jfsu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const userCollection = client.db("employeeDB").collection("users");

    //find a document
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    //find all document
    app.get("/users", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      //console.log(page, size);
      const cursor = userCollection.find();
      const result = await cursor
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    //Count user
    app.get("/usersCount", async (req, res) => {
      const count = await userCollection.estimatedDocumentCount();
      res.send({ count });
    });

    //insert a document
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //update an employee
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updateEmployee = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          first_name: updateEmployee.first_name,
          last_name : updateEmployee.last_name,
          email : updateEmployee.email,
          phone_number : updateEmployee.phone_number,
          date_of_birth : updateEmployee.date_of_birth,
          photo : updateEmployee.photo,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    });

    //delete a document
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
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
  res.send("Employees Server is running");
});
app.listen(port, () => {
  console.log(`Employee Server is running on port : ${port}`);
});
