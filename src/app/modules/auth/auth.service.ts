import prisma from "../../utils/prisma"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import generateToken from "../../utils/generateToken";
import { decodedToken } from "../../utils/decodeToken";

const logInUser = async(payload:{
    email:string,
    password:string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email:payload?.email,
        }
    })
    const isCorrectPassword:Boolean = await bcrypt.compareSync(payload.password, userData.password)
    if(!isCorrectPassword){
             throw new Error('Wrong Password')
        }
    const accessToken = generateToken({
        email:userData.email,
        // role:userData.role
    },'asjchgsccvbfh','15d');
    const refreshToken =generateToken({
        email:userData.email,
        // role:userData.role
    },
    'kvhruhgjreakcnklefh', 
    '30d'
    )
    return {
        accessToken,
        refreshToken,
        // needPasswordChange:userData.needPasswordChange
    };
}

const refreshToken = async(token:string)=>{
    let decodedData;
    try {
         decodedData =decodedToken.verifyToken(token,'kvhruhgjreakcnklefh')
    } catch (err) {
        throw new Error('You are not authorized')
    }
    const isUserExist = await prisma.user.findUniqueOrThrow({
        where:{
            email:decodedData?.email,
            // status:UserStatus.ACTIVE
        }
    });
    const accessToken = generateToken({
        email:isUserExist?.email,
        // role:isUserExist?.role
    },'asjchgsccvbfh','15d');
    return {
        accessToken,
        // needPasswordChange:isUserExist?.needPasswordChange
    };
}

export const AuthServices = {
    logInUser,
    refreshToken,
    
}