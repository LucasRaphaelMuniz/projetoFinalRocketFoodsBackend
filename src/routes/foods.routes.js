const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")


const FoodsController = require("../controllers/FoodsController")
const FoodImagemController = require("../controllers/FoodImagemController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const foodsRoutes = Router();

const upload = multer(uploadConfig.MULTER)

const foodsController = new FoodsController();
const foodImagemController = new FoodImagemController();

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get("/", foodsController.index)
foodsRoutes.post("/", ensureAuthenticated, foodsController.create)
foodsRoutes.get("/:id", foodsController.show)
foodsRoutes.delete("/:id", foodsController.delete)
foodsRoutes.put("/:id", foodsController.update)

foodsRoutes.patch("/imagem/:id", ensureAuthenticated, upload.single("imagem"), foodImagemController.update)

module.exports = foodsRoutes;


// function myMiddleware(req, res, next){
//     console.log("passou pelo midd");

//     if(!req.body.isAdmin) {
//         return res.json({message: "nao autorizado"})
//     }

//     next();
// }


//  foodsRoutes.post("/:user_id", myMiddleware, foodsController.create)

