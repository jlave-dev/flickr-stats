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
    height_o SMALLINT,
    width_o SMALLINT
);

CREATE TABLE IF NOT EXISTS photo_samples (
    id VARCHAR(20) PRIMARY KEY,
    photo_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (photo_id) REFERENCES photos (id),
    sampled TIMESTAMP,
    views INT,
    faves INT,
    comments INT
);
