CREATE OR ALTER PROCEDURE deleteUser(@Id Varchar(255))
AS 
BEGIN 
UPDATE users SET IsDeleted = 0   WHERE Id = @Id;
END