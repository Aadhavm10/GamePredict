const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    teamname: 
    {
        type: String, 
        required: true
    },
    playoff: {
        type: String, 
        required: true
    }   
})

module.exports = mongoose.model('User', userSchema)

