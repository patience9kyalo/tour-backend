CREATE OR ALTER PROCEDURE updateHotel(
    @hid Varchar(255),
    @tid VARCHAR(255),
    @hname Varchar(255),
    @hdescription Varchar (255),
    @hprice INT
)
AS 
BEGIN 
UPDATE Hotel SET tid = @tid, hname = @hname, hdescription = @hdescription, hprice = @hprice WHERE hid=@hid
END