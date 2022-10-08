const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String
},
{
    versionKey: false,
    // collection: 'nome_da_collection'
});

module.exports = mongoose.model('User', userSchema);
// Nome da collection será "users", ele se baseia nesse 'User'