
CREATE OR ALTER PROCEDURE addTour(
    @tid Varchar(255),
    @tname Varchar(255),
    @tdescription Varchar (255),
    @tprice INT
)
AS
BEGIN 
INSERT INTO Tour (tid,tname,tdescription,tprice) VALUES(@tid,@tname,@tdescription,@tprice)
END