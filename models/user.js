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
UserSchema.methods.register = async function(){
    return new Promise(async (resolve,reject)=>{
        this.cleanUp();
        this.data.email = this.data.email.toLowerCase();
        await this.validate();
        
        if(!this.errors.length)
        {
            
            this.data.username = this.data.email.split('@')[0]; 
                      
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            
            this.data.email = this.data.email.toLowerCase();
            
            console.log(this.data);

            await usersCollection.insertOne({
                username:this.data.username,
                email:this.data.email,
                password:this.data.password,
                verified:false,
            }).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            }) 
        }
        else
        {
            reject(this.errors);
        }
    })
}

module.exports = mongoose.model("User",UserSchema)