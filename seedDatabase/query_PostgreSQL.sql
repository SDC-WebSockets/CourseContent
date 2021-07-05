CREATE TABLE elements (
	element_id SERIAL,
	id VARCHAR PRIMARY KEY,
	course_id VARCHAR,
	section_id VARCHAR,
	title VARCHAR(1000),
	sequence INT,
	kind VARCHAR,
	video_url VARCHAR,
	video_preview BOOLEAN,
	summary VARCHAR(5000),
	num_questions INT,
	element_length TIMESTAMP
);

CREATE INDEX idx_element ON sections (course_id, section_id, id);

CREATE TABLE courses (
	course_id SERIAL,
	id VARCHAR PRIMARY KEY,
	total_sections INTEGER,
	total_lectures INTEGER,
	total_exercises INTEGER,
	total_articles INTEGER,
	total_quizzes INTEGER,
	course_length TIMESTAMP,
	updated_at DATE
);

CREATE INDEX idx_course ON courses (course_id, id);

CREATE TABLE sections (
	section_id SERIAL,
	id VARCHAR PRIMARY KEY,
	course_id VARCHAR,
	title VARCHAR(1000),
	section_length TIMESTAMP,
	lectures INT,
	quizzes INT,
	exercises INT,
	articles INT,
	sequence INT
);

CREATE INDEX idx_section ON sections (course_id, id);

DROP TABLE courses;
DROP TABLE sections;
DROP TABLE elements;


