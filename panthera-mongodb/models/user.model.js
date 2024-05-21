const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const saltRounds = 10;
const userSchema = new mongoose.Schema({
fullName: { type:String, required:true },
email: { type:String, required:true },
userName: { type:String, required:true },
password: { type:String, required:true },
phone: { type:String, required:true },
    
},
{Vtimestamps: true}
);

userSchema.pre("save", function (){
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
});
const User = mongoose.model( "User", userSchema );

module.exports = { User };