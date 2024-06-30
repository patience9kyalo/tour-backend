import express, { json } from "express"
import tourRoutes from "./Routes/tourRoutes"
import authRoutes from "./Routes/authRoutes"
import hotelRoutes from "./Routes/hotelRoutes"
import bookingRoutes from "./Routes/bookingRoutes"
import cors from "cors"


const app = express()

//middleware
app.use(json())
app.use(cors())
app.use("/tour", tourRoutes)
app.use("/users", authRoutes)
app.use("/hotel", hotelRoutes)
app.use("/booking", bookingRoutes)

//port
app.listen(4000,()=>{
    console.log('Server running...')
})