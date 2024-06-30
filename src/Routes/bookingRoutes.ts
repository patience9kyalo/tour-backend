import { Router } from "express";
import { verifyToken } from "../Middleware";
import { addBooking, deleteBooking, getBooking, getBookings, updateBooking } from "../Controllers/bookingControllers";



const bookingRouter = Router()
bookingRouter.post("", addBooking)
bookingRouter.get("",verifyToken, getBookings)
bookingRouter.get("/:bid", getBooking)
bookingRouter.put("/:bid", updateBooking)
bookingRouter.delete("/:bid", deleteBooking)



export default bookingRouter
