const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const getIP = require("get-ip")
const { UserModel } = require("../models/User.model")
const { json } = require("express")

const authRouter = express.Router()

authRouter.post("/signup", async(req, res)=>{
    const ip = getIP()
    try {
        const {name, email, password} = req.body
        bcrypt.hash(password, 7, async(err, hashed)=>{
            const submit = new UserModel({name, email, password: hashed, user_IP: ip[0]})
            await submit.save()
            res.json({"msg":"Signup successful"})
        })
    } catch (err) {
        res.json({"msg":"Signup Err"})
    }

})

authRouter.post("/login", async(req, res)=>{
    try {
        const {email, password}= req.body
        const user = await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, (err, valid)=>{
                if(valid){
                    const token = jwt.sign({"userID": user._id}, process.env.KEY)
                    res.json({"msg": "Login Success", "token":token, "user": user.name})
                }else{
                    res.json({"msg":"login Failed"})
                }
            })
        }else{
            res.json({"msg":"User Not found"})
        }
    } catch (error) {
        console.log("Login Error")
        res.json({"msg":"failed"})
    }
})

module.exports = {authRouter}
// console.log