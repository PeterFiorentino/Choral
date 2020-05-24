DROP DATABASE IF EXISTS choral;

CREATE DATABASE choral;

\c choral

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    avatar VARCHAR,
    location VARCHAR,
    instrument VARCHAR,
    fav_genre VARCHAR,
    anthem VARCHAR
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
    art VARCHAR,
    session_closed BOOLEAN,
    volume INT,
    stereo_position INT,
    is_deleted BOOLEAN
);

CREATE TABLE collaborations (
    id SERIAL PRIMARY KEY,
    collaborator_id INT REFERENCES users(id),
    session_id INT REFERENCES sessions(id),
    session_owner_id INT REFERENCES users(id),
    audio VARCHAR,
    instrument_name VARCHAR,
    approved BOOLEAN,
    volume INT,
    stereo_position INT,
    is_deleted BOOLEAN
);

CREATE TABLE follows (
    user_id INT REFERENCES users(id),
    followed_id INT REFERENCES users(id),
    active_status BOOLEAN
);


INSERT INTO users (username, email, password, avatar, location, instrument, fav_genre, anthem)
    VALUES ('Pete', 'peterfiorentino@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/82291899_2917625578250639_4847832305433051136_o.jpg?_nc_cat=102&_nc_sid=dd9801&_nc_oc=AQn4JLNrAp30D7yg_W_kFhZqDDsvz_2AH-r4wYj_yueD6TK1CRVIJ79ld1dvoADIuAGUccFzCkezP0On6Osbs1ub&_nc_ht=scontent-lga3-1.xx&oh=28941a3440125202e788c74887b1eb2e&oe=5EC1780E', 'Staten Island, NY', 'Piano', 'Hip-Hop', 'I Want You Back by The Jackson 5'),
           ('Sergio', 'sergiocohensalama@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', 'https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-8/13909295_10209265229484283_8661418597510466381_o.jpg?_nc_cat=110&_nc_sid=e007fa&_nc_ohc=V2IX486EhwkAX9k5NGJ&_nc_ht=scontent-lga3-1.xx&oh=8e10bb9f9d828aaf9ae8b58beb9d6b4f&oe=5EE605E0','Philadelphia, PA', 'Guitar', 'Rock', 'Sailors Tale by King Crimson'),
           ('Owen', 'owenjones@pursuit.org', '$2b$10$HOsrgrOd.3lQjKw00GNXvOiJveW2QYBJCRyebskKSdWpB.MxXU3xi', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/68545479_3598552950170956_2369962734889467904_n.jpg?_nc_cat=104&_nc_sid=13bebb&_nc_ohc=3Rpomf8HFrQAX_utV5F&_nc_ht=scontent-lga3-1.xx&oh=26a085edc15ae0d711cda1a044510f8d&oe=5EE50B60', 'Brooklyn, NY', 'Bass', 'Acid Jazz', 'Coronus the Terminator by Flying Lotus');


INSERT INTO sessions (owner_id, session_name, genre, bpm, session_key, chord_progression, looking_for, audio, art, session_closed, volume, stereo_position, is_deleted)
    VALUES (1, 'Instrumental Groove', 'reggae', 74, 'C minor', 'C-C-Ab-Bb', 'all instruments', 'http://localhost:3001/audios/drums.mp3', 'http://localhost:3001/images/coral.jpeg', false, 80, 50, false),
           (2, '3/4 Rocker', 'rock', 120, 'E major', 'A-G-E', 'beat and bass', 'http://localhost:3001/audios/guit.mp3', 'http://localhost:3001/images/coral.jpeg', false, 80, 50, false);
           

INSERT INTO collaborations (collaborator_id, session_id, session_owner_id, audio, instrument_name, approved, volume, stereo_position, is_deleted)
    VALUES (1, 1, 1, 'http://localhost:3001/audios/bassguitar.mp3', 'bass', false, 80, 50, false),
           (2, 1, 1, 'http://localhost:3001/audios/leadguitar.mp3', 'guitar', false, 80, 50, false),
           (3, 1, 1, 'http://localhost:3001/audios/horns.mp3', 'horns', false, 80, 50, false),
           (1, 2, 2, 'http://localhost:3001/audios/beat.mp3', 'beat', false, 80, 50, false);


INSERT INTO follows (user_id, followed_id, active_status)
    VALUES(1,2, true),
          (1,3, true),
          (2,1, true),
          (2,3, true),
          (3,1, true),
          (3,2, true);
