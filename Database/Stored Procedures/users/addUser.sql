
CREATE OR ALTER PROCEDURE addUser(
    @Id Varchar(255),
    @Name Varchar(255),
    @Email Varchar(255),
    @Role Varchar(255), 
    @Password VARCHAR(255)
)
AS
BEGIN 
INSERT INTO users (Id, Name, Email, Role, Password) VALUES(@Id,@Name,@Email,@Role, @Password)
END