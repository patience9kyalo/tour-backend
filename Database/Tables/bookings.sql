use tourism

CREATE Table Bookings(
	bid VARCHAR (255) PRIMARY KEY,
    Id VARCHAR (255) FOREIGN KEY (Id) REFERENCES users(Id),
    tid VARCHAR (255) FOREIGN KEY (tid) REFERENCES Tour(tid),
    hid VARCHAR (255) FOREIGN KEY (hid) REFERENCES Hotel(hid),
    Name VARCHAR (255),
    tname Varchar(255),
    hname Varchar(255),
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    totalPrice FLOAT NOT NULL,
    IsEmailSent INT DEFAULT 0,
    IsDeleted INT DEFAULT 0
    
)




