const UserModel = require("../models/UserModel")
var bcrypt = require('bcryptjs');

const registerUser = async (req,res) => {
    try{
        const {name,email,password,profile_pic} = req.body
        const checkEmail = await UserModel.findOne({email})
        if(checkEmail) {
            return res.status(200).json({
                status:false,
                message: 'Email already exits'
            })
        }

        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);

        const payload = {
            name,
            email,
            password:hashPassword,
            profile_pic
        }

        const user = new UserModel(payload)
        const saveUser = await user.save()

        return res.status(200).json({
            status:true,
            data:saveUser,
            message:'User created successfully!'
        })
    }catch(error){
        return res.status(200).json({
            status:false,
            message:error
        })
    }
}

const checkEmail = async (req,res) => {
    try{
        const {email} = req.body
        const checkEmail = await UserModel.findOne({email}).select('-password')
        if(!checkEmail) {
            return res.status(200).json({
                status:false,
                message: 'Record does not exists.'
            })
        }
        return res.status(200).json({
            status: true,
            data: checkEmail,
            message: 'User fetch successfully!'
        })
    }catch(error){
        return res.status(200).json({
            status:false,
            message:error
        })
    }
}

const checkPassword = async (req,res) => {
    try{
        const {password,userId} = req.body
        const user = await UserModel.findById(userId)

        const verifyPassword = await bcrypt.compare(password, user.password)
    
        if(!verifyPassword) {
            return res.status(200).json({
                status:false,
                message: 'Password are wrong .'
            })
        }
        return res.status(200).json({
            status: true,
            data: user,
            message: 'User fetch successfully!'
        })
    }catch(error){
        return res.status(200).json({
            status:false,
            message:error.message || error
        })
    }
}

module.exports = {
    registerUser,
    checkEmail,
    checkPassword
}