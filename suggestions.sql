DROP TABLE IF EXISTS suggestions;

CREATE TABLE suggestions(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO suggestions (first, last, message) VALUES ('green', 'berlin', 'do a best parks for grilling compilation!'), ('ziggy', 'stardust', 'love the bowie route!'), ('berlin', '030', 'I would like a history of berlin tour :)')