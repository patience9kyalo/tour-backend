CREATE OR ALTER PROCEDURE deleteTour(@tid Varchar(255))
AS 
BEGIN 
UPDATE Tour SET IsDeleted = 1   WHERE tid = @tid;
END