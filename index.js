
const cors =require('cors');
const user = require('./server/models/User')
const express = require("express");
const path = require("path");
const app = express();


const config = require("./server/config/dev");
const mongoose = require("mongoose");


mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



app.use(express.json())
app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(cors()) For access 

app.use('/api/dialogflow', require('./server/routes/dialogflow'));



app.get('/',(req , res) => res.status(200).send("HELLO PEOPLE"))


app.post('/user', (req, res) => {
  const userMsg = req.body;

  user.User.create(userMsg , (err, data) => {
      if(err) {
          res.status(500).send(err)
      }else{
          res.status(201).send(data)
      }
  })
})



app.get('/user', (req, res) => {
  console.log("here")
   
  user.User.find( (err, data) => {
      if(err) {
          res.status(500).send(err)
      }else{
          res.status(200).send(data)
      }
  })
} )


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});