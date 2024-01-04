const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8080;
const uri = process.env.DB_CONNECTION_STRING;

// const users = [{_id: "123456", name: "Vita"}];

// app.get("/users", (req, res) => {
//   res.send(users);
// });


const client = new MongoClient(uri);


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

//  app.delete("/tasks/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       const con = await client.connect();

//     //   console.log(`Deleting task with ID: ${id}`);

//       const data = await con
//         .db("api")
//         .collection("users")
//         .deleteOne({ _id: new ObjectId(id) });
//       await con.close();
  
//       res.send(data);
//     } catch (error) {
//         // console.error(error); 
//       res.status(400).send(error);
//     }
//   });

app.listen(port, () => console.log(`Server is running on port ${port}`));