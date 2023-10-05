import express from 'express';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import cors from "cors";

dotenv.config()

const app = express();

app.options('*', cors())
app.use(cors())

const PORT=5000;
console.log(process.env.MONGO_URL);

//mongo  db connections
const MONGO_URL = process.env.MONGO_URL;
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb is connected");
    return client;
};
const client = await createConnection();

app.use(express.json());

// app.get('/',  (req, res)=> {
//   res.send('Welcome to the world of Hell');
// });


// app.get('/product', async (req, res)=> {
//   const products = await client
//   .db("project-manager")
//   .collection("product") 
//   .find()
//   .toArray()
//   res.send(products);
// });

// //get product by ID

// app.get('/product/:id', async (req, res)=> {
//   const { id }=req.params;
//   const products = await client
//   .db("project-manager")
//   .collection("product")
//   .findOne({id:id});
//   res.send(products);
// });

// //delete product by ID

// app.delete('/product/:id', async (req, res)=> {
//   const { id }=req.params;
//   const products = await client
//   .db("project-manager")
//   .collection("product")
//   .deleteOne({ id: id });
//   res.send(products);
// });      

// // add product by ID

// app.post('/product', async (req, res)=>{
// //where we will pass data-body
// const newProducts = req.body;
//   const result = await client
//   .db("project-manager")
//   .collection("product")
//   .insertMany(newProducts);
//   res.send(result);
// });    

// //update products

// app.put('/product', async (req, res)=>{
//   const {id}=req.params;
//   //where we will pass data-body
//   const updateProducts = req.body;
//     const result = await client
//     .db("project-manager")
//     .collection("product")
//     .updateOne({id:id},{$set:updateProducts});
//     res.send(result);
//   });    




// GET Product by ID
app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await client
      .db("project-manager")
      .collection("product")
      .findOne({ _id: id });
    res.send(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE Product by ID
app.delete('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client
      .db("project-manager")
      .collection("product")
      .deleteOne({ _id: id });
    res.send(result);
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST (Add) Product
app.post('/product', async (req, res) => {
  const newProduct = req.body;
  try {
    const result = await client
      .db("project-manager")
      .collection("product")
      .insertOne(newProduct);
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT (Update) Product
app.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    const result = await client
      .db("project-manager")
      .collection("product")
      .updateOne({ _id: id }, { $set: updatedProduct });
    res.send(result);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT,()=>console.log("Hello World",PORT)); 
