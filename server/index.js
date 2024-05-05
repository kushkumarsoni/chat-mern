const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectDB')
const dotenv = require('dotenv')

dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    return res.json({
        status:true,
        message: "Server is working fine.."
    })
})

app.use('/api',require('./routes/auth'))


const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`Server running at ${PORT} http port`)
})