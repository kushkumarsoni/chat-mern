const UserModel = require("../models/UserModel")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getUserDetailFromToken } = require("../helper/helper");

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

        const tokenData = {
            id:user._id,
            email:user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn : '1d'});
        
        const cookieOptions = {
            http:true,
            secure: true
        }

        return res.cookie('token',token,cookieOptions).status(200).json({
            status:true,
            message:'User created successfully!',
            data:saveUser,
            token: token
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
            message: 'User fetch successfully!',
            data: checkEmail,
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

        const tokenData = {
            id:user._id,
            email:user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn : '1d'});
        
        const cookieOptions = {
            http:true,
            secure: true
        }

        return res.cookie('token',token,cookieOptions).status(200).json({
            status: true,
            message: 'User fetch successfully!',
            data: user,
            token:token
        })
    }catch(error){
        return res.status(200).json({
            status:false,
            message:error.message || error
        })
    }
}


const getUserDetail = async (req,res) => {
    try{
        const token = req.cookies.token || ""
        const user = await getUserDetailFromToken(token);
        return res.status(200).json({
            status: true,
            message: 'User fetch successfully!',
            data: user,
        })
    }catch(error){
        return res.status(200).json({
            status:false,
            message:error.message || error
        })
    }
}

const logout = async (req,res) => {
    try{
        const cookieOptions = {
            http:true,
            secure: true
        }
        return res.cookie('token','',cookieOptions).status(200).json({
            status: true,
            message: 'logout successfully',
        })
    }catch(error){
        return res.status(200).json({
            status:false,
            message:error.message || error
        })
    }
}

const updateUserDetail = async (req,res) => {
    try{
       const token = req.cookies.token || ""
       const user = await getUserDetailFromToken(token);
        
        if(!user) {
            return res.status(200).json({
                status: false,
                message: 'User Not found',
            })
        }
        const {name,profile_pic} = req.body

        if(!name) {
            return res.status(200).json({
                status:false,
                message:'Name is required'
            })
        }

        const updateUser = await UserModel.updateOne({_id:user._id},{
            name,
            profile_pic
        })

        const userInformation  = await UserModel.findById(user._id).select('-password')
        return res.status(200).json({
            status: true,
            message: 'Profile successfully updated',
            data: userInformation
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
    checkPassword,
    getUserDetail,
    logout,
    updateUserDetail
}