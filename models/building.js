const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const BuildingSchema = new mongoose.Schema({
    name : {
        type : String,
        required :  [true,'Plese Provide a Name'],
        maxlength : [80,'Name must be less than 80 characters']
    },
   Location : {
       type : "Point",
       coordinates : {
           latitude : {
               type : float,
               required :  [true,'Plese Provide a Latitude'],
           },
           longitude : {
            type : float,
            required :  [true,'Plese Provide a longitude'],
        }
       }
   } ,
   Address: {
       type : String,
       required :  [true,'Plese Provide a Address'],
        maxlength : [200,'Address must be less than 200 characters']
   },
   PIN : {
    type : Number,
    required :  [true,'Plese Provide a PIN'],
     maxlength : [10,'PIN must be less than 10 characters']
   },
   City: {
    type : String,
    required :  [true,'Plese Provide a City'],
     maxlength : [30,'City must be less than 30 characters']
    },
    State: {
        type : String,
        required :  [true,'Plese Provide a State'],
         maxlength : [30,'State must be less than 30 characters']
    },
    Country: {
        type : String,
        required :  [true,'Plese Provide a Country'],
         maxlength : [30,'Country must be less than 30 characters']
    },
    Type : {
        type :  String,
        enum : ["Government","Private"],
        required : true
    },
    Category : {
        type : String,
        enum : ["Food","Hotel","Cinema","Railway","Bus","Other"]
    },
    Facilities: [String],
    
})
