import {Request} from "express"

export interface Hotel{
    hid: string,
    hname: string,
    hdescription: string,
    hprice: number,
    tid:string

}

export interface addHotel{
    hname: string,
    hdescription: string,
    hprice: number,
    tid:string

}

export interface HotelRequest extends Request {
    body:addHotel
}


