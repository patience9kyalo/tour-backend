export interface User{
    length: number
    Id:string,
    Name:string,
    Role:string,
    Password:string,
    IsDelete:number,
    IsEmailSent:number
}

export interface Payload{
    Sub:string,
    Id:string,
    Name:string,
    Role:string
}