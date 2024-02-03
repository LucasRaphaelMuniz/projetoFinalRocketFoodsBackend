const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(req, res) {
        const { name, email, password, isAdmin} = req.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.")
        }

        const hashedPassword = await hash(password, 8)

        await database.run("INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, isAdmin])

        return res.status(201).json();
    }

}

module.exports = UsersController