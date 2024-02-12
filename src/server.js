require("express-async-errors")
require("dotenv/config")
const AppError = require("./utils/AppError")
const migrationsRun = require("./database/sqlite/migrations")
const uploadoConfig = require("./configs/upload")


const express = require("express");
const cors = require("cors")
const routes = require("./routes/index.js")

migrationsRun();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/files", express.static(uploadoConfig.UPLOADS_FOLDER))

app.use(routes);


app.use((error, req, res, next) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Serve is running on Port ${PORT}`)); 
