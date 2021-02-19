const { response } = require("express");
const express= require("express");
const app = express();
const path = require("path");
const port = 8080;
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",async (req,res,next)=>{
    res.sendFile("index.html");  
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