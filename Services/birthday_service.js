const userModel = require('../Model/birthday')

const CreateBirthday = async({first_name,last_name,email,dateOfBirth}) => {
    try {
        const newBirthday = await userModel.create({
            first_name,
            last_name,
            email,
            dateOfBirth,
            created_at:new Date()
        })

        const savedBirthday = await newBirthday.save();
        return{
            code:201,
            success:true,
            message:'Birthday created successfully',
            data:{
                savedBirthday
            }
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"Error creating birthday post",
            error:error.message
        };
    }
}

const GetBirthday = async (userId) => {
    try {
        const birthday = await userModel.findOne({_id:userId})

        if(!birthday){
            return{
                code:404,
                success:true,
                message:"Birthday not found",
                data:{birthday}
            }
        }
        return{
            code:200,
            success:true,
            message:"Birthday found",
            data:{birthday}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:error.message,
            data:null
        }
    }
}

const GetAllBirthday = async() =>{
    try {
        const birthday = await userModel.find({})
        if(!birthday.length === 0){
            return{
                code:404,
                success:false,
                message:"No birthday available",
                data:null
            };
        }
        return{
            code:200,
            success:true,
            message:'Birthday available',
            data:{birthday}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while get birthdays",
            error:error.messagem
        }
    }
}

const UpdateBirthday = async ({userId,first_name,last_name,email,dateOfBirth}) => {
    try {
        const birthday = await userModel.findOneAndUpdate(
            {_id:userId},
            { 
                $set: { 
                    first_name, 
                    last_name, 
                    email, 
                    dateOfBirth,
                    updated_at: new Date() // Ensure updated_at is set
                }
            },
            { new: true, runValidators: true }
        )
        if (!birthday) {
            return{
                code:404,
                success:false,
                message:"Birthday not found",
                data:null
            }
        }
        return{
            code:200,
            success:true,
            message:"Birthday updated successfully",
            data:{birthday}
        };
        
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while making an update",
            error:error.message
        }
    }
};

module.exports = {
    GetAllBirthday,GetBirthday,UpdateBirthday,CreateBirthday
}