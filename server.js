const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://glan:LGXshi123@cluster0.ik8w9.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));

const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/api/sales", (req, res) =>{
  myData.addNewSale(req.body)
  .then((data) => {res.json({message : data})})
  .catch((err) => {res.json({massage : err})});
});


app.get("/api/sales", (req, res) =>{
  console.log('req.query.page', req.query.page);
  console.log('req.query.perPage', req.query.perPage);

  myData.getAllSales(req.query.page, req.query.perPage)
  .then((data) => {res.json({message  : data});})
  .catch((err) => {res.json({message : err});});
});



app.get("/api/sales/:_id", (req, res) => {
  myData.getSaleById(req.params._id)
  .then((data) => {res.json({message : data});})
  .catch((err) => {res.json({message : err});});
});

app.put("/api/sales/:_id", (req, res) => {
  myData.updateSaleById(req.body, req.params._id)
  .then((data) => {res.json({message : data});})
  .catch((err) => {res.json({message : err});});
});


app.delete("/api/sales/:_id", (req, res) => {
  myData.deleteSaleById(req.params._id)
  .then((data) => {res.json({message : data});})
  .catch((err) => {res.json({message : err});});
});


myData.initialize().then(()=>{
  app.listen(HTTP_PORT,()=>{
      console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});




