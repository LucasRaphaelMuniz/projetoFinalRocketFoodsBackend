const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class FoodImagemController {
    async update(req, res) {
        const { id } = req.params;
        const imagemFilename = req.file.filename;
        const diskStorage = new DiskStorage();

        const food = await knex("foods")
        .where({ id: id}).first()

        if(!food) {
            throw new AppError("Somnete usuário autenticado pode altera a imagem dos pratos", 401)
        }

        if(food.imagem){
            await diskStorage.deleteFile(food.imagem)
        }

        const filename = await diskStorage.saveFile(imagemFilename);
        food.imagem = filename

        await knex("foods").update(food).where({ id: id})

        return res.json(food)

    }
}

module.exports = FoodImagemController