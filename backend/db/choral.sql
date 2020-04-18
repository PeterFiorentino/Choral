DROP DATABASE IF EXISTS choral;

CREATE DATABASE choral;

\c choral

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    avatar VARCHAR
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id),
    session_name VARCHAR,
    genre VARCHAR,
    bpm INT,
    session_key VARCHAR,
    chord_progression VARCHAR,
    looking_for VARCHAR,
    audio VARCHAR,
    session_closed BOOLEAN,
    volume INT
);

CREATE TABLE collaborations (
    id SERIAL PRIMARY KEY,
    collaborator_id INT REFERENCES users(id),
    session_id INT REFERENCES sessions(id),
    audio VARCHAR,
    comment VARCHAR,
    approved BOOLEAN,
    volume INT
);

INSERT INTO users (username, email, password, avatar)
    VALUES ('Pete', 'peterfiorentino@pursuit.org', 'abc123', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/82291899_2917625578250639_4847832305433051136_o.jpg?_nc_cat=102&_nc_sid=dd9801&_nc_oc=AQn4JLNrAp30D7yg_W_kFhZqDDsvz_2AH-r4wYj_yueD6TK1CRVIJ79ld1dvoADIuAGUccFzCkezP0On6Osbs1ub&_nc_ht=scontent-lga3-1.xx&oh=28941a3440125202e788c74887b1eb2e&oe=5EC1780E'),
           ('Sergio', 'sergiocohensalama@pursuit.org', 'abc123', 'https://f4.bcbits.com/img/0006520542_10.jpg'),
           ('Owen', 'owenjones@pursuit.org', 'abc123', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/68651886_3598543233505261_6173724632814714880_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQngpc5LQJWLalKfc4YVDei2AcYDZ1Q_Bv4-Jb0WNenPJg3G2Qi6P_Py5NuCvUzX2tD3LXHHz_U94s7iUFR7wliU&_nc_ht=scontent-lga3-1.xx&oh=c683d319bb8ce8d2681d06a977a6b5e5&oe=5EBF55A3');



INSERT INTO sessions (owner_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, session_closed, volume)
    VALUES (1, 'Instrumental Groove', 'reggae', 74, 'C minor', 'C-C-Ab-Bb', 'all instruments', 'http://localhost:3001/audios/drums.mp3', false, 80),
    VALUES (2, '3/4 Rocker', 'rock', 120, 'E major', 'A-G-E', 'beat and bass', 'http://localhost:3001/audios/guit.mp3', false, 80);

INSERT INTO collaborations (collaborator_id, session_id, audio, comment, approved, volume)
    VALUES (1, 1, 'http://localhost:3001/audios/bassguitar.mp3', '', false, 80),
           (2, 1, 'http://localhost:3001/audios/leadguitar.mp3', '', false, 80),
           (3, 1, 'http://localhost:3001/audios/horns.mp3', '', false, 80),
           (1, 2, 'http://localhost:3001/audios/beat.mp3', '', false, 80);

SELECT * FROM users;
SELECT * FROM sessions;
SELECT * FROM collaborations;