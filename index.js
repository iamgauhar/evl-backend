
const express = require("express")
const getIP = require("get-ip")
const cors = require("cors")
const {connection} = require("./db/db")
const { todoRoter } = require("./routes/todo.route")
const { authRouter } = require("./routes/user.route")


const app =express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use("/user",authRouter)
app.use("/todo",todoRoter)

app.get("/", (req, res)=>{
    res.json({"msg": "Welcome"})
})

app.listen(8080, async()=>{
    try {
        await connection;
        console.log("DB connected");

    } catch (err) {
        console.log(err)
        res.json({"msg":"Server Error"})
        
    }
    console.log("listning on 8080")
})

