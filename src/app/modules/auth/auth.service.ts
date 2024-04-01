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
        id:userData.id
    },'asjchgsccvbfh','15d');
    const refreshToken =generateToken({
        email:userData.email,
        id:userData.id
    },
    'kvhruhgjreakcnklefh', 
    '30d'
    )
    return {
        accessToken,
        refreshToken,
        user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        }
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
            id:decodedData.id
        }
    });
    const accessToken = generateToken({
        email:isUserExist?.email,
    },'asjchgsccvbfh','15d');
    return {
        accessToken,
    };
}

const registerUser = async(payload:any) => {
    const { name, email, password, bio, profession, address } = payload;
    const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
                profile: {
                    create: {
                        bio,
                        profession,
                        address,
                    },
                },
            },
            // include: {
            //     profile: true, 
            // },
        });

        
        const { password: _, ...userDataWithoutPassword } = user;
        return userDataWithoutPassword;
        
}

export const AuthServices = {
    logInUser,
    refreshToken,
    registerUser
    
}