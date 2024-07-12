const postgres = require('postgres');

const db = postgres('postgres://jianhui@localhost:5432/mandai_test');

module.exports = db;