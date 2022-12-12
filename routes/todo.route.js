const express = require("express")
const { authenticate } = require("../middlewares/authenticate")

const {TodoModel} = require("../models/Todo.model")

const todoRoter = express.Router()
todoRoter.use(authenticate)

todoRoter.get("/", async(req, res)=>{
    try {
        const userID = req.body.userID
        const userTodo = await TodoModel.find({userID: userID})
        res.send(userTodo)
    } catch (error) {
        console.log(error);
        res.json({"msg":"login  failed"})
        
    }
})

todoRoter.post("/create", async(req, res)=>{
    const todoData = req.body
    try {
        const newTodo = await new TodoModel(todoData)
        newTodo.save()
        res.json({"msg":"Added Successfully"})
    } catch (err) {
        console.log(err)
        res.json({"msg":"Note create failed"})
        
    }

})

todoRoter.patch("/edit/:todoID", async(req, res)=>{
    const tID = req.params.todoID
    const userID = req.body.userID
    const newData = req.body
    try {
        const note = await TodoModel.findOne({_id: tID})
        if(userID == note.userID){
            await TodoModel.findByIdAndUpdate({_id: tID}, newData)
            res.json({"msg":"Note edited successfully"})
        }else{
            res.json({"msg":"Notauthorized"})
        }
    } catch (err) {
        console.log(err);
        res.json({"msg":"Note edit failed"})
    }
})
todoRoter.delete("/delete/:todoID", async(req, res)=>{
    const tID = req.params.todoID
    const userID = req.body.userID
    try {
        const note = await TodoModel.findOne({_id: tID})
        if(userID == note.userID){
            await TodoModel.findByIdAndDelete({_id: tID})
            res.json({"msg":"Note Deleted successfully"})
        }else{
            res.json({"msg":"Notauthorized"})
        }
    } catch (err) {
        console.log(err);
        res.json({"msg":"Note deleting failed"})
    }
})

module.exports = {todoRoter}