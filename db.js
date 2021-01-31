const spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/final-project"
);

module.exports.getLocationInfo = () => {
    return db.query(`SELECT * FROM locations;`);
};

module.exports.getSuggestions = () => {
    return db.query(`SELECT * FROM suggestions ORDER BY id DESC`);
};

module.exports.addNewSuggestions = (first, last, message) => {
    return db.query(
        `INSERT INTO suggestions (first, last, message) VALUES ($1, $2, $3) RETURNING id, first, last, message, created_at`,
        [first, last, message]
    );
};
