const bodyParses = require("body-parser")
const cors = require("cors")

module.exports = app => {
    app.use(bodyParses.json())
    app.use(cors())
}