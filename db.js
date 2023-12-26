const Pool = require("pg").Pool
const pool = new Pool({
    'host':'localhost',
    'user':'postgres',
    'password':'Zxcvbnm123',
    'port': 5432,
    'database':'onlas'
})

module.exports = pool