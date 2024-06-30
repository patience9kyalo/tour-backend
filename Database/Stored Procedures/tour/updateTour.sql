CREATE OR ALTER PROCEDURE updateTour(
    @tid Varchar(255),
    @tname Varchar(255),
    @tdescription Varchar (255),
    @tprice INT
    
)
AS 
BEGIN 
UPDATE Tour SET tname = @tname, tdescription = @tdescription, tprice = @tprice WHERE tid=@tid
END