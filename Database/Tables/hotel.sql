use tourism

CREATE Table Hotel(
	hid Varchar(255) PRIMARY KEY,
	tId VARCHAR (255) FOREIGN KEY (tId) REFERENCES Tour(tid),
	hname Varchar(255),
	hdescription Varchar(255),
    hprice INT,
	isDeleted INT DEFAULT 0
)

