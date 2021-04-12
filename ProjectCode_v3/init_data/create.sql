
CREATE TABLE IF NOT EXISTS user_table (
  full_name VARCHAR(30),    
  username VARCHAR(30) NOT NULL,  
  password_ VARCHAR(30) NOT NULL,
  major VARCHAR(30),
  gpa DECIMAL(3,2),       
  year  VARCHAR(30),
  pronouns VARCHAR(30),
  experience VARCHAR(500),
  PRIMARY KEY(username) 
);



INSERT INTO user_table(full_name, username, password_, major, gpa, year, pronouns, experience)
VALUES('Abeal Sileshi', 'abealsileshi', 'fakepassword', 'CS', 4.00, 'senior' , 'he/him/his', 'I have minimal experience.'); 