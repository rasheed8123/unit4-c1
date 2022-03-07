const express = require("express")
const app = express()

app.get("/books",logger,function(req,res){
    return res.send({route:req.path})
})
app.get("/libraries",logger,checkPermission("librarian"),function(req,res){
    return res.send({route:req.path,permission:req.permission})
})
app.get("/authors",logger,checkPermission("author"),function(req,res){
    return res.send({route:req.path,permission:req.permission})
})
function logger(req,res,next){
    console.log(req.path)
    next()
}
function checkPermission(para){
return function innner(req,res,next){
    if(para == "librarian" || para == "author"){
       req.permission = true;
    }

    next()
}
}

app.listen(5000)