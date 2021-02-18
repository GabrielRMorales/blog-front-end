const { response } = require("express");
const express= require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",async (req,res,next)=>{
  /* fetch("http://localhost:3000")
    .then(data=>data.json())
    .then(d=>{
        console.log(d)
        res.send(d);
    })
    .catch(err=>console.log(err));*/
    let postData = await fetch("http://localhost:3000")
    postData= await postData.json();
    res.send(postData);   
});




//error handling

app.use((req,res,next)=>{
   const error = new Error("Content not found");
   error.status = 404;
   error.message = "Content not found";
   next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal server error"
        }
    })

});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
});