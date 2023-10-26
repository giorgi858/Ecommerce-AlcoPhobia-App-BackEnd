const mongoose = require('mongoose');

const conndb = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })    
    } catch (err) {
        console.log(err);
    }
}


module.exports = conndb;