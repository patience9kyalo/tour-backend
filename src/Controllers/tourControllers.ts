import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import mssql from 'mssql'
import { DbHelper } from '../Database Helpers'
import { Tour, TourRequest } from '../Models/tourModels'
import { sqlConfig } from '../config'

const dbInstance= new DbHelper()

export const addTour=async(req:TourRequest, res:Response)=>{
    try {
        
        const tid =uid()
        const {tname, tdescription, tprice }= req.body
        await dbInstance.exec("addTour",{tid:tid, tname, tdescription, tprice })
        res.status(201).json({message:"Tour added"})

    } catch (error) {
        
        res.status(500).json(error)
    }
}


export const getTours:RequestHandler= async(req,res)=>{
    try {
        const tours=(await dbInstance.exec('getTours',{})).recordset as Tour[]
        res.status(200).json(tours)
    } catch (error) {
        res.status(500).json(error)
    }
    }
    

export const getTour= async(req:Request<{tid:string}>,res:Response)=>{
    try {
        const tour=( await dbInstance.exec('getTour',{tid:req.params.tid})). recordset[0] as Tour
        if(tour && tour.tid){
            return res.status(200).json(tour)
        }

        return res.status(404).json({message:"Tour Not Found"})

    } catch (error) {
        res.status(500).json(error)
    }
    }
    
export async function getHotelTour(req: Request<{ hid: string }>, res: Response) {
    try {
        let pool = await mssql.connect(sqlConfig)

        const hoteltour = (await pool.request()
            .input('hid', req.params.hid)
            .execute('getHotelTour')).recordset[0] as Tour[]

        if (getTours.length > 0) {
            return res.status(200).json(hoteltour)
        }


    } catch (error) {
        return res.status(500).json(error)
    }
}


export const updateTour=async (req:Request<{tid:string}>,res:Response)=>{
    try {
        
        const tour=(await dbInstance.exec('getTour', {tid:req.params.tid})).recordset[0] as Tour
         if(tour && tour.tid){
            const {tname, tdescription, tprice}=req.body
            await dbInstance.exec('updateTour', {tid:req.params.tid, tname, tdescription, tprice})
             return res.status(200).json({message:"Tour Updated!"})
         }
         return res.status(404).json({Message:'Tour not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const deleteTour=async (req:Request<{tid:string}>,res:Response)=>{
    try {
        const tour=(await dbInstance.exec('getTour', {tid:req.params.tid})).recordset[0] as Tour
 
         if(tour && tour.tid){
            await dbInstance.exec('deleteTour', {tid:req.params.tid})
             return res.status(200).json({Message:"Tour deleted Sucessfully!!"})
         }
         return res.status(404).json({Message:'Tour not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}