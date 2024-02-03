const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create)

module.exports = usersRoutes;



// function myMiddleware(req, res, next){
//     console.log("passou pelo midd");

//     if(!req.body.isAdmin) {
//         return res.json({message: "nao autorizado"})
//     }

//     next();
// }


//  foodsRoutes.post("/:user_id", myMiddleware, foodsController.create)