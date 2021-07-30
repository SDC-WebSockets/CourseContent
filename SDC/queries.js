module.exports = [
  'DROP TABLE IF EXISTS elements;',
  'DROP TABLE IF EXISTS sections;',
  'DROP TABLE IF EXISTS courses;',
  'CREATE TABLE courses (course_id SERIAL, id VARCHAR PRIMARY KEY, course_length TIMESTAMP WITH TIME ZONE, total_sections INT, total_lectures INT, total_exercises INT, total_articles INT, total_quizzes INT, updated_at DATE);',
  'CREATE TABLE sections (section_id SERIAL, id VARCHAR PRIMARY KEY, course_id VARCHAR, title VARCHAR(1000), section_length TIMESTAMP WITH TIME ZONE, lectures INT, quizzes INT, exercises INT, articles INT, sequence INT);',
  'CREATE TABLE elements (element_id SERIAL, id VARCHAR PRIMARY KEY, course_id VARCHAR, section_id VARCHAR, title VARCHAR(1000), kind VARCHAR, video_url VARCHAR DEFAULT NULL, video_preview BOOLEAN DEFAULT NULL, summary VARCHAR(5000) DEFAULT NULL, num_questions INT DEFAULT NULL, element_length TIMESTAMP WITH TIME ZONE, sequence INT);',
  'CREATE INDEX idx_course ON courses (course_id, id);',
  'ALTER TABLE sections ADD CONSTRAINT section_course_constraint FOREIGN KEY (course_id) REFERENCES courses (id);',
  'CREATE INDEX idx_sections_test ON sections(course_id);',
  'CREATE INDEX idx_element_test ON elements (course_id, section_id, id);',
  'ALTER TABLE elements ADD CONSTRAINT element_course_constraint FOREIGN KEY (course_id) REFERENCES courses (id);',
  'ALTER TABLE elements ADD CONSTRAINT element_section_constraint FOREIGN KEY (section_id) REFERENCES sections (id);'
];