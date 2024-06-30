

CREATE OR ALTER PROCEDURE deleteBooking
   @bid VARCHAR(255)
AS 
BEGIN 
UPDATE Bookings SET IsDeleted = 1  WHERE bid = @bid;
END
