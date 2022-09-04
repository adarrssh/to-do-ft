const mongoose = require('mongoose');


const connecToMongo =()=>{ mongoose.connect("mongodb+srv://adarsh:adarsh@cluster0.o0dnsga.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to DB")
})
}

module.exports = connecToMongo;