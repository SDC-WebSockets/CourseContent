DROP TABLE courses;
DROP TABLE sections;
DROP TABLE [elements];

CREATE TABLE courses (
	course_id SERIAL,
	id VARCHAR PRIMARY KEY,
	course_length TIMESTAMP,
	total_sections INTEGER,
	total_lectures INTEGER,
	total_exercises INTEGER,
	total_articles INTEGER,
	total_quizzes INTEGER,
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
	sequence INT,
	CONSTRAINT course_id FOREIGN KEY(course_id) REFERENCES courses(id)
);

CREATE INDEX idx_section ON sections (course_id, id);

CREATE TABLE elements (
	element_id SERIAL,
	id VARCHAR PRIMARY KEY,
	course_id VARCHAR,
	section_id VARCHAR,
	title VARCHAR(1000),
	kind VARCHAR,
	video_url VARCHAR DEFAULT NULL,
	video_preview BOOLEAN DEFAULT NULL,
	summary VARCHAR(5000) DEFAULT NULL,
	num_questions INT DEFAULT NULL,
	element_length TIMESTAMP,
	sequence INT,
	CONSTRAINT course_id FOREIGN KEY(course_id) REFERENCES courses(id),
	CONSTRAINT section_id FOREIGN KEY(section_id) REFERENCES sections(id)
);

CREATE INDEX idx_element ON sections (course_id, section_id, id);

-- COURSE QUERY
-- SELECT
-- 	*
-- FROM courses WHERE course_id = 10;

-- -- SECTION QUERY by COURSE_ID
-- SELECT
-- 	*
-- FROM sections WHERE course_id IN (SELECT id FROM courses WHERE course_id = 10);


-- SELECT
-- 	A.*
-- FROM sections A
-- JOIN (SELECT id FROM courses WHERE course_id = 10) B ON (A.course_id = B.id);

-- -- ELEMENT QUERY by COURSE_ID
-- SELECT
-- 	*
-- FROM elements WHERE course_id IN (SELECT id FROM courses WHERE course_id = 10);