import {Request} from "express"

export interface Booking{
    bid: string,
    Id: string,
    tid: string,
    hid:string,
    Name:string,
    tname:string,
    hname:string,
    checkInDate: Date,
    checkOutDate: Date,
    totalPrice: number,
    isEmailSent: number

}

export interface addBooking{
    Id: string,
    tid: string,
    hid:string,
    Name:string,
    tname:string,
    hname:string,
    checkInDate: Date,
    checkOutDate: Date,
    totalPrice: number

}

export interface BookingRequest extends Request {
    body:addBooking
}


