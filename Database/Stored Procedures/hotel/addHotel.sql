CREATE OR ALTER PROCEDURE addHotel(
    @hid Varchar (255),
    @tid Varchar (255),
    @hname Varchar(255),
    @hdescription Varchar(255),
    @hprice INT

)
AS 
BEGIN
    INSERT INTO Hotel (hid, tid, hname, hdescription, hprice) VALUES (@hid, @tid, @hname, @hdescription, @hprice)
END