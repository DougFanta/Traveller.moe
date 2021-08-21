const mongoose = require('mongoose')
mongoose.Promise = Promise;
const connectDB = async (uri) =>{
    try{
        const connect = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB Connected: ${connect.connection.host}`)

    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
