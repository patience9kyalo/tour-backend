use tourism

CREATE Table Tour(
	tid Varchar(255) PRIMARY KEY,
	tname Varchar(255),
	tdescription Varchar(255),
	tprice INT,
	isDeleted INT DEFAULT 0
)



