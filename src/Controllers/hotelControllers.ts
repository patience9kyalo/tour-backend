import { Request, Response, RequestHandler } from 'express'
import { v4 as uid } from 'uuid'
import { DbHelper } from '../Database Helpers'
import { Hotel, HotelRequest } from '../Models/hotelModels'


const dbInstance = new DbHelper()

export const addHotel = async (req: HotelRequest, res: Response) => {
    try {

        const hid = uid()
        const { tid, hname, hdescription, hprice } = req.body
        await dbInstance.exec("addHotel", { hid: hid, tid, hname, hdescription, hprice })
        res.status(201).json({ message: "Hotel added" })

    } catch (error) {

        res.status(500).json(error)
    }
}


export const getHotels: RequestHandler = async (req, res) => {
    try {
        const hotels = (await dbInstance.exec('getHotels', {})).recordset as Hotel[]
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getHotel = async (req: Request<{ hid: string }>, res: Response) => {
    try {
        const hotel = (await dbInstance.exec('getHotel', { hid: req.params.hid })).recordset[0] as Hotel
        if (hotel && hotel.hid) {
            return res.status(200).json(hotel)
        }

        return res.status(404).json({ message: "Hotel Not Found" })

    } catch (error) {
        res.status(500).json(error)
    }
}



export const updateHotel = async (req: Request<{ hid: string }>, res: Response) => {
    try {
        const hotel = (await dbInstance.exec('getHotel', { hid: req.params.hid })).recordset[0] as Hotel
        console.log(hotel)
        if (hotel && hotel.hid) {

            if (hotel && hotel.hid) {
                //update 
                const { hname, hdescription, hprice, tid } = req.body
                console.log(hname, hdescription, hprice);


                if (hotel && hotel.hid) {
                    await dbInstance.exec('updateHotel', { hid: req.params.hid, hname, hdescription, hprice, tid })
                    return res.status(200).json({ message: "Hotel updated " })

                }
                return res.status(404).json({ message: "Hotel Not Found" })

            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteHotel = async (req: Request<{ hid: string }>, res: Response) => {
    try {
        const hotel = (await dbInstance.exec('getHotel', { hid: req.params.hid })).recordset[0] as Hotel

        if (hotel && hotel.hid) {
            await dbInstance.exec('deleteHotel', { hid: req.params.hid })
            return res.status(200).json({ message: "Hotel Deleted " })
        }

        return res.status(404).json({ message: "Hotel Not Found" })

    } catch (error) {
        res.status(500).json(error)
    }
}