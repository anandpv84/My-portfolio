const mongoose = require('mongoose')

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString).then((res)=>{
    console.log("mpngodb connected successfully !!!")
}).catch((err)=>{
    console.log(`mongodb failed due to ${err}`)
}) 