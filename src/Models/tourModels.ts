import {Request} from "express"

export interface Tour{
    tid: string,
    tname: string,
    tdescription: string,
    tprice: number
    
}

export interface addTour{
    tname: string,
    tdescription: string,
    tprice: number

}

export interface TourRequest extends Request {
    body:addTour
}


