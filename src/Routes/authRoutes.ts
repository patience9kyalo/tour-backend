import { Router } from "express"
import { deleteUser, getUser, getUserEmail, getUsers, loginUser, registerUser, updateUser } from "../Controllers/authControllers"
import { verifyToken, verifyUserToken } from "../Middleware"

const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("/:Id", verifyToken, getUser)
authRoutes.get("/:Email", verifyToken, getUserEmail)
authRoutes.get("", verifyToken, getUsers)
authRoutes.put("/:Id", updateUser)
authRoutes.delete("/:Id", verifyToken, deleteUser)
export default authRoutes