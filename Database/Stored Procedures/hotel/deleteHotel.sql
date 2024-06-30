CREATE OR ALTER PROCEDURE deleteHotel(@hid Varchar(255))
AS 
BEGIN 
UPDATE Hotel SET IsDeleted = 1   WHERE hid = @hid;
END