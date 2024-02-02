const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

function myMiddleware(req, res, next){
    console.log("passou pelo midd");

    if(!req.body.isAdmin) {
        return res.json({message: "nao autorizado"})
    }

    next();
}


const usersController = new UsersController();

usersRoutes.post("/", myMiddleware, usersController.create)

module.exports = usersRoutes;