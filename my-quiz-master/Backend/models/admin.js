// Create a schema for admin : 

const mongoose = require('mongoose')

const { Schema } = mongoose;

const AdminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    }
});
const Admin = mongoose.model('admin', AdminSchema)
// User.createIndexes()
module.exports = Admin;