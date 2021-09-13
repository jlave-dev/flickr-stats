USE defaultdb;
DROP DATABASE IF EXISTS flickrstats CASCADE;
CREATE DATABASE IF NOT EXISTS flickrstats;

USE flickrstats;

CREATE TABLE IF NOT EXISTS photos (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255),
    description JSON,
    uploaded TIMESTAMP,
    updated TIMESTAMP,
    taken TIMESTAMP,
    tags TEXT,
    camera VARCHAR(255),
    url_sq VARCHAR(255),
    url_t VARCHAR(255),
    url_s VARCHAR(255),
    url_l VARCHAR(255),
    url_o VARCHAR(255),
    height_o INTEGER,
    width_o INTEGER
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(20) PRIMARY KEY,
    joined TIMESTAMP,
    occupation VARCHAR(255),
    hometown VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    facebook VARCHAR(255),
    twitter VARCHAR(255),
    tumblr VARCHAR(255),
    instagram VARCHAR(255),
    pinterest VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS photo_samples (
    id VARCHAR(20) PRIMARY KEY,
    photo_id VARCHAR(20) NOT NULL,
    sampled TIMESTAMP,
    views INTEGER,
    faves INTEGER,
    comments INTEGER,
    FOREIGN KEY (photo_id) REFERENCES photos(id)
);

CREATE TABLE IF NOT EXISTS user_samples (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    sampled TIMESTAMP,
    followers INTEGER,
    following INTEGER,
    photos INTEGER,
    views INTEGER,
    tags INTEGER,
    geotags INTEGER,
    faves INTEGER,
    groups INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);