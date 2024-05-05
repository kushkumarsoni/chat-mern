const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('Mongo db is connected successfully')
        })
        connection.on('error',(error)=>{
            console.log('Error in connection',error)
        })
    }catch(error) {
        console.log("Something went wrong",error);
    }
}

module.exports = connectDB