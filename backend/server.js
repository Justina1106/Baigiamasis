const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8080;
const uri = process.env.DB_CONNECTION_STRING;


const client = new MongoClient(uri);

// const users = [{_id: "123456", name: "Vita"}];

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.post("/users", (req, res) => {
//   const user = req.body; // {name: "Vita"};
//   console.log(user);
//   const newUser = { ...user, _id: Date.now().toString() };
//   users.push(newUser);
//   res.send(newUser);
//   // res.send({ message: "Created" });
// });

app.get("/tasks", async (req, res) => {
  try {
     const con = await client.connect();
     const response = await con.db("api").collection("users").find().toArray();
     await client.close();
    res.send(response);
 }  catch (error) {
    res.status(400).send(error);
 }
 
});

app.post("/tasks", async (req, res) => {
   try {
     const task = req.body; // {name: "..."}
     const con = await client.connect();
     const response = await con.db("api").collection("users").insertOne(task);
     await client.close();
     res.send(response);
   } catch (error) {
     res.status(400).send(error);
   }
 });

app.listen(port, () => console.log(`Server is running on port ${port}`));