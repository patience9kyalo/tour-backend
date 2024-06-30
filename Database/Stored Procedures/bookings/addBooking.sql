CREATE OR ALTER PROCEDURE addBooking(
    @bid Varchar (255),
    @Id VARCHAR (255),
    @tid Varchar(255),
    @hid Varchar(255),
    @Name VARCHAR (255),
    @tname Varchar(255),
    @hname Varchar(255),
    @checkInDate DATE,
    @checkOutDate DATE,
    @totalPrice FLOAT 

)
AS 
BEGIN
    INSERT INTO Bookings (bid, Id,tid,hid, Name, tname, hname, checkInDate, checkOutDate, totalPrice) VALUES (@bid, @Id, @tid, @hid,@Name, @tname, @hname, @checkInDate,@checkOutDate, @totalPrice)
END



