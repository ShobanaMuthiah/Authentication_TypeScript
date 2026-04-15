import type { NextFunction, Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { HTTPError } from '../utils/exception.util';
import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken"
import { UserEntity } from '../db/Models/userModel';
import { AppDataSource } from '../db/data-source';

interface LoginBody {
    email?: string;
    password?: string
}
const userRepository = AppDataSource.getRepository(UserEntity)

const generateTokens=(email:string)=>{
    const accessToken=jwt.sign(
        {email},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn:"5m"}
    )
    const refreshToken=jwt.sign(
        {email},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn:"1d"}
    )
    return {accessToken,refreshToken}
}

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository
        .createQueryBuilder("users")
        .select(['id', 'email', 'username'])
        .getRawMany();
    res.status(200).json(users)

}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body
    if (!email || !password || !username) throw new HTTPError(400, "All fields are required");

    const userExist = await userRepository.findOneBy({ email: email })
    const isMatch = await userExist?.comparePassword(password)
    if (userExist && isMatch) throw new HTTPError(400, "UserEntity already exists");
    const user = userRepository.create({
        email,
        password,
        username,


    })


    await userRepository.save(user)
    const {accessToken,refreshToken}=generateTokens(email)

    res.cookie("jwt",refreshToken,{
        httpOnly:true,
        sameSite:"none",
        secure:true,
        maxAge:24*60*60*1000
    })
    res.status(200).json({ status: "Success", accessToken,user:{id:user.id,username:user.username,email:user.email}, message: "Successfully user registered" }).end();

}

export const loginUser = async (req: Request<{}, {}, LoginBody>, res: Response, next: NextFunction) => {

    const { email, password } = req.body
    if (!email || !password) throw new HTTPError(400, "Email or password is required")


    const user = await userRepository.findOneBy({ email: email })
    console.log("user: ", user)
    if (!user) throw new HTTPError(400, "UserEntity not found")
    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new HTTPError(400, 'Given Password is wrong')

        const {accessToken,refreshToken}=generateTokens(email)
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    })


    res.status(200).json({
        status: "Success", accessToken: accessToken, message: "Logged in Successfully",
        user: { id: user.id, username: user.username, email: user.email }
    }).end()
    return

}

export const refreshToken = (req: Request, res: Response) => {

    if (!req.cookies?.jwt) throw new HTTPError(403)

    const refreshToken = req.cookies.jwt
    if (typeof refreshToken !== 'string') throw new HTTPError(400, 'Refresh token must be string')
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string,
        (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
            if (err) {
                throw new HTTPError(403)
            }

            if (!decoded || typeof decoded === "string") throw new HTTPError(403)

            let email = decoded.email
            const accessToken = jwt.sign({ email: userRepository.findOneBy({ email: email }) },
                process.env.ACCESS_TOKEN_SECRET as string, {
                expiresIn: '5m'
            })
            // const user = userRepository.findOneBy({ email: email })
            return res.status(200).json({ accessToken }).end()

        })

}

export async function oAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.body.credential as string
    const client = new OAuth2Client()
    const data = await client.verifyIdToken({ idToken: token, audience: "784262751833-nuju8goog74mnckf2euilgb6vqkc4ins.apps.googleusercontent.com" })
    const pa = data.getPayload()
    // res.redirect("http://localhost:5173")

    if (!pa || !pa.email) throw new HTTPError(400, "Email id is required")

    const user = await userRepository.findOneBy({ email: pa.email })
    const {accessToken,refreshToken}=generateTokens(pa.email)
    res.cookie("jwt",refreshToken,{
        httpOnly:true,
        sameSite:"none",
        secure:true,
        maxAge:24*60*60*1000
    })
    let userId,userData
    if (!user) {

        const userCreate = userRepository.create({ email: pa.email, username: pa.name as string })

        await userRepository.save(userCreate)
        userData = await userRepository.findOne({ where:{email: pa.email },
        select:["id"]})
        res.status(200).json({ status: "Success",accessToken,user:{email:pa.email,username:pa.name,id:userId}, message: "Registered Successfully" }).end()
    }


        userData =await userRepository.findOne({ where:{email: pa.email },
        select:["id"]})
        userId=userData?.id
    res.status(200).json({ status: "Success",user:{email:pa.email,username:pa.name,id:userId},accessToken, message: "Logged in Successfully" }).end()

}


export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query, currentUserId } = req.query;

    if (!query) {
      return res.status(200).json([]);
    }

    const users = await userRepository
      .createQueryBuilder("users")
      .select(["users.id", "users.username"])
      .where("users.username ILIKE :query", {
        query: `%${query}%`,
      })
      .andWhere("users.id != :currentUserId", {
        currentUserId,
      })
      .limit(10)
      .getMany();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};