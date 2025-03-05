const app = require('./app')
const db = require('./Utils/db')
const PORT = 3030;
require("./Utils/cronJob")

db.connectToMongoDb()

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
}) 