const express = require("express");
const cors = require("cors");
// const { MongoClient } = require("mongodb");



const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.json());

const port = 3000;
// const URI =
//   "mongodb+srv://admin:admin@cluster0.moabhd3.mongodb.net/?retryWrites=true&w=majority"; // connection stringas (nepamirstam pakeisti password)


// const client = new MongoClient(URI);

const users = [{_id: "123456", name: "Vita"}];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const user = req.body; // {name: "Vita"};
  console.log(user);
  const newUser = { ...user, _id: Date.now().toString() };
  users.push(newUser);
  res.send(newUser);
  // res.send({ message: "Created" });
});

// app.get("/tasks", async (req, res) => {
//   try {
//     const con = await client.connect();
//     const response = await con.db("api").collection("users").find().toArray();
//     await client.close();
//     res.send(response);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.post("/users", async (req, res) => {
//   try {
//     const task = req.body; // {name: "..."}
//     const con = await client.connect();
//     const response = await con.db("api").collection("users").insertOne(task);
//     await client.close();
//     res.send(response);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));