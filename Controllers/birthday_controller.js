const { render } = require('ejs');
const userService = require('../Services/birthday_service')

const CreateBirthday = async (req,res) => {
    const payload = req.body;

    try {
        const createResponse = await userService.CreateBirthday({
            first_name:payload.first_name,
            last_name:payload.last_name,
            email:payload.email,
            //user,
            dateOfBirth:payload.dateOfBirth
        })
        console.log("Create Response:", createResponse)
        if (createResponse.success) {
            return res.redirect('/')
        }
        return res.status(createResponse.code).render('create',{message:createResponse.message})
    } catch (error) {
        console.error(error)
        return res.status(500).render('error', {message:'Internal Server error'})
    }    
}

const GetBirthday = async(req,res) => {
    const userId = req.params.userId
    try {
        const createResponse = await userService.GetBirthday(userId)
        if (createResponse.data.birthday) {
            const birthday = createResponse.data.birthday;
            return res.status(createResponse.code).render('single',{
                birthdays:birthday
            })
        }else{
            return res.status(createResponse.code).render('error', {message: 'Birthday not found'});
        }
    } catch (error) {
        return res.status(500).render('error',{message: 'Internal server error'})
    }
}

const GetAllBirthday = async(req,res) =>{

    try {
        const createResponse = await userService.GetAllBirthday({});
        const DOB = createResponse?.data?.birthday || [];

        return res.status(createResponse?.code || 200).render('all',{
            DOBS:DOB
        })
    } catch (error) {
        return res.status(500).render('error', {message: 'Internal Server Error'})
    }   
} 

const UpdateBirthday = async (req,res) => {
    const userId = req.params.userId

    try {
        const {first_name,last_name,email,dateOfBirth} = req.body
        const createResponse = await userService.UpdateBirthday({
            first_name,last_name,dateOfBirth,email,userId
        }) 
        if (createResponse.data.birthday) {
            const DOB = createResponse.data.birthday
            return res.status(createResponse.code).render('update',{
                DOBS:DOB
            })
        }else{
            return res.status(404).render('error', {message:"Update not possible"})
        }
    } catch (error) {
        return res.status(500).render('error', { message: 'Internal Server Error' });
    }
}

module.exports = {
    CreateBirthday,GetAllBirthday,GetBirthday,UpdateBirthday
}