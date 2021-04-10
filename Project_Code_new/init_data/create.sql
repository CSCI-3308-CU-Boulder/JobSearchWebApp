DROP TABLE IF EXISTS football_games CASCADE;
CREATE TABLE IF NOT EXISTS football_games (
  visitor_name VARCHAR(30),       /* Name of the visiting team                     */
  home_score SMALLINT NOT NULL,   /* Final score of the game for the Buffs         */
  visitor_score SMALLINT NOT NULL,/* Final score of the game for the visiting team */
  game_date DATE NOT NULL,        /* Date of the game                              */
  players INT[] NOT NULL,         /* This array consists of the football player ids (basically a foreign key to the football_player.id) */
  PRIMARY KEY(visitor_name, game_date) /* A game's unique primary key consists of the visitor_name & the game date (this assumes you can't have multiple games against the same team in a single day) */
);

DROP TABLE IF EXISTS football_players CASCADE;
CREATE TABLE IF NOT EXISTS football_players(
  id SERIAL PRIMARY KEY,       /* Unique identifier for each player (it's possible multiple players have the same name/similiar information) */
  name VARCHAR(50) NOT NULL,   /* The player's first & last name */
  year VARCHAR(3),             /* FSH - Freshman, SPH - Sophomore, JNR - Junior, SNR - Senior */
  major VARCHAR(4),            /* The unique 4 character code used by CU Boulder to identify student majors (ex. CSCI, ATLS) */
  passing_yards SMALLINT,      /* The number of passing yards in the players entire football career  */
  rushing_yards SMALLINT,      /* The number of rushing yards in the players entire football career  */
  receiving_yards SMALLINT,    /* The number of receiving yards in the players entire football career*/
  img_src VARCHAR(200)         /* This is a file path (absolute or relative), that locates the player's profile image */
);

INSERT INTO football_games(visitor_name, home_score, visitor_score, game_date, players)
VALUES('Colorado State', 45, 13, '20200831', ARRAY [1,2,3,4,5]),
('Nebraska', 33, 28, '20200908', ARRAY [2,3,4,5,6]),
('New Hampshire', 45, 14, '20200915', ARRAY [3,4,5,6,7]),
('UCLA', 38, 16, '20200928', ARRAY [4,5,6,7,8]),
('Arizona State', 28, 21, '20201006', ARRAY [5,6,7,8,9]),
('Southern California', 20, 31, '20201013', ARRAY [6,7,8,9,10]),
('Washington', 13, 27, '20201020', ARRAY [7,8,9,10,1]),
('Oregon State', 34, 41, '20201027', ARRAY [8,9,10,1,2]),
('Arizona', 34, 42, '20201102', ARRAY [9,10,1,2,3]),
('Washington State', 7, 31, '20201110', ARRAY [10,1,2,3,4]),
('Utah', 7, 30, '20201117', ARRAY [1,2,3,4,5]),
('California', 21, 33, '20201124', ARRAY [2,3,4,5,6])
;

INSERT INTO football_players(name, year, major, passing_yards, rushing_yards, receiving_yards, img_src)
VALUES('Cedric Vega', 'FSH', 'ARTS', 15, 25, 33, '../resources/img/player1.jpg'),
('Myron Walters', 'SPH', 'CSCI', 32, 43, 52, '../resources/img/player2.jpg'),
('Javier Washington', 'JNR', 'MATH', 1, 61, 45, '../resources/img/player3.jpg'),
('Wade Farmer', 'SNR', 'ARTS', 14, 55, 12, '../resources/img/player4.jpg'),
('Doyle Huff', 'FSH', 'CSCI', 23, 44, 92, '../resources/img/player5.jpg'),
('Melba Pope', 'SPH', 'MATH', 13, 22, 45, '../resources/img/player6.jpg'),
('Erick Graves', 'JNR', 'ARTS', 45, 78, 98, '../resources/img/player7.jpg' ),
('Charles Porter', 'SNR', 'CSCI', 92, 102, 125, '../resources/img/player8.jpg'),
('Rafael Boreous', 'JNR', 'MATH', 102, 111, 105, '../resources/img/player9.jpg'),
('Jared Castillo', 'SNR', 'ARTS', 112, 113, 114, '../resources/img/player10.jpg');

DROP TABLE IF EXISTS favorite_colors;
CREATE TABLE IF NOT EXISTS favorite_colors(
  hex_value VARCHAR(6) PRIMARY KEY, /* This is the hexvalue for the color, it assumes that the value DOES NOT # */
  name VARCHAR(50),                 /* The html safe name for the color.  This can be null */
  color_msg  TEXT NOT NULL          /* A message describing the chosen color */
);

INSERT INTO favorite_colors(hex_value, name, color_msg)
VALUES('FF6347', 'TOMATO', 'This color gets it name from the red fruit that at one time was considered poisonous!'),
('3CB371', 'Medium Sea Green', 'Not sure what the difference is between Small & Large Sea Green... but I guess this one is in between them.'),
('EE82EE','Violet', 'Roses are Red, Violets are blue...'),
('545AA7','Liberty', 'Not to be confused with the color of the Liberty Bell (which is indeed a copper color)');

INSERT INTO favorite_colors(hex_value, color_msg)
VALUES('FF2727', 'An unnamed red color'),
('27FF27', 'An unnamed green color'),
('870087', 'An unnamed magenta color'),
('8F8FFF', 'An unnamed blue color');
