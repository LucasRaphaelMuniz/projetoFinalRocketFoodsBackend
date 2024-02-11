const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FoodsController{
    async create(req, res){
        const { imagem, nome, categoria, ingredientes, preco, descricao } = req.body;
        const user_id  = req.user.id;

        const [food_id] = await knex("foods").insert({
            imagem, 
            nome, 
            categoria, 
            preco, 
            descricao,
            user_id
        });

        const IngredientesInsert = ingredientes.map(ingredientes => {
            return{
                food_id,
                ingredientes,
                user_id
            }
        });

        await knex("ingredientes").insert(IngredientesInsert);

        res.json();
    }

    async show(req, res){
        const { id } = req.params;

        const food = await knex("foods").where({ id }).first();
        const ingredientes = await knex("ingredientes").where({ food_id: id}).orderBy("ingredientes");

        return res.json({
            ...food,
            ingredientes
        })
    }

    async delete(req, res){
        const { id } = req.params;

        await knex("foods").where({ id }).delete();

        return res.json();
    }

    async update(req, res){
        const { id } = req.params;
        const user_id  = req.user.id;
        const { nome, categoria, ingredientes, preco, descricacao, imagem } = req.body

        const foods = await knex("foods").where({ id })

        if (!foods) {
            return res.status(404).json({ error: 'Prato não localizado!' });
        }


        const foodUpdate = {
            nome: nome ?? foods.name,
            categoria: categoria ?? foods.categoria,
            preco: preco ?? foods.preco,
            descricao: descricacao ?? foods.descricacao,
            imagem: imagem ?? foods.imagem,
            updated_at:knex.fn.now(),
        }

        await knex("foods").where({ id }).update(foodUpdate);

        if (ingredientes) {
            await knex ("ingredientes").where({ food_id: id }).delete();

            const ingredientesNovos = ingredientes.map((ingredientes) => {
                return{
                    food_id: id,
                    user_id,
                    ingredientes,

                }
            });

            await knex("ingredientes").insert(ingredientesNovos);
        }

        return res.json();

    }

    async index(req, res) {
        const { search } = req.query;
        let foods;
    
        try {
            // Pesquisa por nome ou ingredientes
            foods = await knex("foods")
                .where("nome", "like", `%${search}%`)
                .orWhereExists(function() {
                    this.select("*")
                        .from("ingredientes")
                        .whereRaw("foods.id = ingredientes.food_id")
                        .andWhere("ingredientes", "like", `%${search}%`);
                })
                .orderBy("nome");
    
            return res.json(foods);
        } catch (error) {
            console.error("Erro ao buscar alimentos:", error);
            return res.status(500).json({ error: "Erro ao buscar alimentos" });
        }
    }


    
}
module.exports = FoodsController