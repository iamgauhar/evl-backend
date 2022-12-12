const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req, res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token);
        const decode = jwt.verify(token, process.env.KEY)
        if(decode){
            const userID = decode.userID
            req.body.userID = userID
            next()
        }else{
            res.json({"msg":"Please Login"})
        }
    }else{
        res.json({"msg":"Please Login"})
    }
}

module.exports = {authenticate}