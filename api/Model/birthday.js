const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        first_name:{
            type:String,
            required:[true,'Please enter your First Name']
        },
        last_name:{ 
            type:String,
            required:[true, 'Please enter your Last Name']
        },
        email:{
            type:String,
            required:[true,'Please enter your mail']
        },
        dateOfBirth:{
            type:Date,
            required: true,
            set: (val) => new Date(val),
            get:function () {
                return this.dateOfBirth
                    ? this.dateOfBirth.toISOString().split("T")[0]
                    : null;
            }
        },
        created_at:{
            type:Date,
            default:Date.now
        }
    },{toJson: {getters: true}}
);

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel