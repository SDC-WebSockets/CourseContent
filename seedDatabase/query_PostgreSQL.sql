CREATE TABLE courses (
	courseid SERIAL,
	id VARCHAR PRIMARY KEY,
	totalsections INTEGER,
	totallectures INTEGER,
	totalexercises INTEGER,
	totalarticles INTEGER,
	totalquizzes INTEGER,
	courselength TIMESTAMP,
	updatedat DATE
);

CREATE TABLE sections (
	sectionid SERIAL,
	id VARCHAR PRIMARY KEY,
	courseid VARCHAR,
	title VARCHAR(1000),
	sectionlength TIMESTAMP,
	lectures INT,
	quizzes INT,
	exercises INT,
	articles INT,
	sequence INT
);

CREATE TABLE elements (
	elementid SERIAL,
	id VARCHAR PRIMARY KEY,
	courseid VARCHAR,
	sectionid VARCHAR,
	title VARCHAR(1000),
	sequence INT,
	kind VARCHAR,
	videourl VARCHAR,
	videopreview BOOLEAN,
	summary VARCHAR(5000),
	numquestions INT,
	elementlength TIMESTAMP
);


