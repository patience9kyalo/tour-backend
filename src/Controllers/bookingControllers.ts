import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { DbHelper } from '../Database Helpers'
import { Booking, BookingRequest } from '../Models/bookingModels'
import moment from 'moment'
import { sqlConfig } from '../config'


const dbInstance= new DbHelper()

export const addBooking = async (req: Request, res: Response) => {
    try {
        const bid = uid();
        const { Id, tid, hid, Name, tname, hname, checkInDate, checkOutDate, totalPrice } = req.body;

        if (!moment(checkInDate, 'mm/dd/yyyy', true).isValid() || !moment(checkOutDate, 'mm/dd/yyyy', true).isValid()) {
            return res.status(400).json({ error: 'Invalid date format. Use mm/dd/yyyy.' });
        }

        await dbInstance.exec("addBooking", { bid, Id, tid, hid, Name, tname, hname, checkInDate, checkOutDate, totalPrice });

        res.status(200).json({ message: 'Booking added successfully.' });
    } catch (error) {
        res.status(500).json({ error });
    }
};


export const getBookings:RequestHandler= async(req,res)=>{
    try {
        const bookings=(await dbInstance.exec('getBookings',{})).recordset as Booking[]
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json(error)
    }
    }

export const getBooking= async(req:Request<{bid:string}>,res:Response)=>{
    try {
        const booking=( await dbInstance.exec('getBooking',{bid:req.params.bid})). recordset[0] as Booking
        if(booking && booking.bid){
            return res.status(200).json(booking)
        }

        return res.status(404).json({message:"Booking Not Found"})

    } catch (error) {
        res.status(500).json(error)
    }
    }

export const updateBooking= async(req:Request<{bid:string}>,res:Response)=>{
    try {
        const booking=( await dbInstance.exec('getBooking',{bid:req.params.bid})). recordset[0] as Booking
        if(booking && booking.bid){

        if(booking && booking.bid){
            //update 
            const {Id, tid, hid,Name,tname,hname, checkInDate, checkOutDate, totalPrice } =req.body
            console.log(Id, tid, hid, checkInDate, checkOutDate, totalPrice );
            
            
        if(booking && booking.bid){
            await dbInstance.exec('updateBooking',{bid:req.params.bid, Id, tid, hid,Name,tname,hname, checkInDate, checkOutDate, totalPrice })
            return res.status(200).json({message:"Booking updated "})

        }

        return res.status(404).json({message:"Booking Not Found"})

    } }
}catch (error) {
        res.status(500).json(error)
    }
    }


export const deleteBooking= async(req:Request<{bid:string}>,res:Response)=>{
    try {
        const booking=( await dbInstance.exec('getBooking',{bid:req.params.bid})). recordset[0] as Booking

        if(booking && booking.bid){
            await dbInstance.exec('deleteBooking',{bid:req.params.bid})
            return res.status(200).json({message:"Booking Deleted "})
        }

        return res.status(404).json({message:"Booking Not Found"})

    } catch (error) {
        res.status(500).json(error)
    }
    }
