const router = require('./Routes/router')
const appMiddleware = require('./Middlewares/appMiddlewares')

require('dotenv').config()
const express = require("express")

require('./DB/connections')

const cors = require('cors')
const pfServer = express();

pfServer.use(cors())
pfServer.use(express.json());

pfServer.use(router)


const PORt = 4000;
pfServer.listen(PORt,()=>{
    console.log(`server is running successfully at port:${PORt}`)
})

pfServer.get('/',(req,res)=>{
    res.send("portfolio")
})
