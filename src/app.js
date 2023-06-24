const express = require("express");
const routes = require("express").Router();
const bodyParser = require("body-parser");
const taskInfo = require("../routes/taskInfo");
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(routes);

routes.use('/tasks', taskInfo);

const PORT = 3000;




app.listen(3000, (err)=>{
    if(!err) {
        console.log("server started sucessfully");
    }else{
        console.log("Error starting the server");
    }
})