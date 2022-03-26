const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required :  [true,'Plese Provide a Name'],
        maxlength : [30,'Name must be less than 30 characters']
    },
    email : {
        type : String,
        required :  [true,'Plese Provide an email'],
        validate : [validator.isEmail,'Please provide correct email'],
        unique : true
    },
    password : {
        type : String,
        required :  [true,'Plese Provide an email'],
        minlength : [6,'Password must be atleast 6 characters'],
        select : false
    },
    ForgotPasswordToken : String,
    ForgotPasswordExpiry : Date,
    CreatedAt : {
        type : Date,
        default : Date.now()
    },
});

UserSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

UserSchema.methods.validatePassword = async function(passwordReceived){
    return await bcrypt.compare(passwordReceived,this.password)
}

UserSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_expiry})
}
module.exports = mongoose.model("User",UserSchema)