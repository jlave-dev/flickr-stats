CREATE TABLE IF NOT EXISTS photos (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255),
    description JSON,
    uploaded TEXT,
    updated TEXT,
    taken TEXT,
    tags TEXT,
    camera VARCHAR(255),
    url_sq VARCHAR(255),
    url_t VARCHAR(255),
    url_s VARCHAR(255),
    url_l VARCHAR(255),
    url_o VARCHAR(255),
    height_o SMALLINT,
    width_o SMALLINT
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(20) PRIMARY KEY,
    joined TEXT,
    occupation TEXT,
    hometown TEXT,
    first_name TEXT,
    last_name TEXT,
    facebook TEXT,
    twitter TEXT,
    tumblr TEXT,
    instagram TEXT,
    pinterest TEXT
);

CREATE TABLE IF NOT EXISTS photo_samples (
    id VARCHAR(20) PRIMARY KEY,
    photo_id VARCHAR(20) NOT NULL,
    sampled TEXT,
    views INT,
    faves INT,
    comments INT,
    FOREIGN KEY (photo_id) REFERENCES photos(id)
);

CREATE TABLE IF NOT EXISTS user_samples (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    sampled TEXT,
    followers INT,
    following INT,
    photos INT,
    views INT,
    tags INT,
    geotags INT,
    faves INT,
    groups INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);