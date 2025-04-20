const app = require('./app')
const db = require('./Utils/db')
require("./Utils/cronJob")
require('dotenv').config()

const PORT = process.env.PORT || 3030

db.connectToMongoDb()

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
}) 