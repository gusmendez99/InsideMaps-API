require('dotenv').config()

const database = process.env.DATABASE;
const user = process.env.DBOWNER;
const password = process.env.DBPASSWORD;

console.log(`mongodb://${user}:${password}@ds153096.mlab.com:53096/${database}`)

module.exports = {
    db: `mongodb://${user}:${password}@ds153096.mlab.com:53096/${database}`
}