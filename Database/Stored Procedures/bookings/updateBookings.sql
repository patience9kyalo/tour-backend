CREATE OR ALTER PROCEDURE updateBooking(
    @bid Varchar (255),
    @Id VARCHAR (255),
    @tid Varchar(255),
    @hid Varchar(255),
    @checkInDate DATE,
    @checkOutDate DATE,
    @totalPrice FLOAT 
)
AS 
BEGIN 
UPDATE Bookings SET bid = @bid, Id= @Id, tid = @tid, hid = @hid, checkInDate = @checkInDate, checkOutDate = @checkOutDate, totalPrice = @totalPrice
END