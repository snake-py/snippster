const {CREATE_TABLES, SEED_DATA} = require('./db')

module.exports.migrate = function () {
    const db = CREATE_TABLES()

    SEED_DATA(db)

}

