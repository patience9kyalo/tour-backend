import { Request, Response, RequestHandler } from 'express'
import { v4 as uid } from 'uuid'
import { RegisterSchema } from '../Helpers'
import Bcrypt from 'bcrypt'
import { Payload, User } from '../Models/authModels'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { DbHelper } from '../Database Helpers'
dotenv.config({ path: path.resolve(__dirname, "../../.env") })


const dbInstance = new DbHelper()

export const registerUser = async (req: Request, res: Response) => {
    try {
        const id = uid()
        const { Name, Email, Password, Role = 'user' } = req.body
        const { error } = RegisterSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        const HashPassword = await Bcrypt.hash(Password, 10)
        await dbInstance.exec('addUser', { Id: id, Name, Email, Password: HashPassword, Role })

        return res.status(201).json({ Message: "User Was Added SuccessfullY!!", Role })
    } catch (error) {
        return res.status(500).json(error)
    }

}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;
    let user = (await dbInstance.exec('getUserEmail', { Email })).recordset[0] as User;
    

    if (user) {
      const isValid = await Bcrypt.compare(Password, user.Password);

      if (isValid) {
        // Fetch user's role from database
        const userRole = await dbInstance.exec('getUserRole', { Id: user.Id }); 

        const payload = {
          Sub: user.Id,
          Id: user.Id,
          Name: user.Name,
          Role: userRole 
        };

        const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '4h' });
        return res.status(200).json({ message: "Login success!!", token, Role: userRole });
      }
    }

    return res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    return res.status(500).json(error);
  }

}


export const getUser = async (req: Request<{ Id: string }>, res: Response) => {
    try {
        const user = (await dbInstance.exec('getUser', { Id: req.params.Id })).recordset[0] as User
        if (user.length! == 0) {
            return res.status(200).json(user)
        }

        return res.status(404).json({ message: "User Not Found" })

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserEmail = async (req: Request<{ Email: string }>, res: Response) => {
    try {
        const user = (await dbInstance.exec('getUserEmail', { Email: req.params.Email })).recordset[0] as User
        if (user.length! == 0) {
            return res.status(200).json(user)
        }

        return res.status(404).json({ message: "User Not Found" })

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserRole = async (req: Request<{ Id: string }>, res: Response) => {
    try {
        const user = (await dbInstance.exec('getUserRole', { Id: req.params.Id })).recordset[0] as User
        if (user.length! == 0) {
            return res.status(200).json(user)
        }

        return res.status(404).json({ message: "User Not Found" })

    } catch (error) {
        res.status(500).json(error)
    }
}



export async function getUsers(req: Request, res: Response) {
    try {

        const users = (await dbInstance.exec('getUsers', {})).recordset as User[]
        return res.status(200).json(users)


    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function updateUser(req: Request<{ Id: string }>, res: Response) {
    try {

        const user = (await dbInstance.exec('getUser', { Id: req.params.Id })).recordset[0] as User

        if (user && user.Id) {

            if (user && user.Id) {
                const { Email, Name, Role, Password } = req.body

                if (user && user.Id) {
                    await dbInstance.exec("updateUser", { Id: req.params.Id, Email, Name, Role, Password })
                    return res.status(200).json({ message: "User updated" })
                }

                return res.status(200).json({ message: "User not found" })

            }
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function deleteUser(req: Request<{ Id: string }>, res: Response) {
    try {
        const user = (await dbInstance.exec('getUser', { Id: req.params.Id })).recordset[0] as User

        if (user && user.Id) {
            await dbInstance.exec('deleteUser', { Id: req.params.Id })
            return res.status(200).json({ Message: "User deleted successfully" })
        }
        return res.status(404).json({ message: "User not found" })

    } catch (error) {
        return res.status(500).json(error)
    }
}