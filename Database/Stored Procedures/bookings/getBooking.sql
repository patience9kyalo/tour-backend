CREATE OR ALTER PROCEDURE getBooking(@bid Varchar(255))
AS 
BEGIN 
SELECT * FROM Bookings WHERE bid = @bid
END