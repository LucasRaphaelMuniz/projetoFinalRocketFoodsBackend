const { Router } = require("express");

const usersRouter = require("./users.routes")
const foodsRouter = require("./foods.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router();

routes.use("/users", usersRouter)
routes.use("/foods", foodsRouter)
routes.use("/sessions", sessionsRoutes)

module.exports = routes;