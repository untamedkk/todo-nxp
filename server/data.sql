CREATE DATABASE todo;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status INT,
    date VARCHAR(100)
)