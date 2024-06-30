import { Router } from "express";
import { addTour, deleteTour, getTour, getTours, updateTour } from "../Controllers/tourControllers";
import { verifyToken } from "../Middleware";



const tourRouter = Router()
tourRouter.post("", verifyToken, addTour)
tourRouter.get("", getTours)
tourRouter.get("/:tid", getTour)
tourRouter.patch("/:tid", verifyToken, updateTour)
tourRouter.delete("/:tid",verifyToken, deleteTour)


export default tourRouter
