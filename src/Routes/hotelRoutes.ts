import { Router } from "express";
import { verifyToken } from "../Middleware";
import { addHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../Controllers/hotelControllers";



const hotelRouter = Router()
hotelRouter.post("", verifyToken, addHotel)
hotelRouter.get("", getHotels)
hotelRouter.get("/:hid", verifyToken, getHotel)
hotelRouter.patch("/:hid", verifyToken, updateHotel)
hotelRouter.delete("/:hid", verifyToken, deleteHotel)




export default hotelRouter
