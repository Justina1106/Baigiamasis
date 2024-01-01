const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
// const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(express.json());
// const PORT = process.env.PORT || 3002;

// app.use(bodyParser.json());

// MongoDB prisijungimas
const port = 3002;
const URI = 
    "mongodb+srv://admin:admin@cluster0.moabhd3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URI);

// mongoose.connect('mongodb+srv://admin:admin@cluster0.moabhd3.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // MongoDB modelis
// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   age: Number,
// });

// Registracijos forma
app.get("/", async (req, res) => {
    try {
      const con = await client.connect(); // prijungia prie Duomenu bazes
      const data = await con.db("api").collection("users").find().toArray(); // veiksmas - istraukiama is duomenu bazes
      await con.close(); // atsijungiam nuo duomenu bazes
  
      res.send(data); // issiunciam duomenis i route
    } catch (error) {
      res.status(400).send(error); // suhandlinam errora ir nustatom 400 http statusa, kad suprastu jog kazkas ne OK
    }
  });

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Nepavyko įrašyti vartotojo' });
  }
});

// Užsiregistravusių vartotojų sąrašas
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Nepavyko gauti vartotojų sąrašo' });
  }
});

app.listen(port, () => console.log(`Serveris veikia portu ${port}`));