const { Router } = require("express")
const productsRouter = Router()
const productsController = require("../controllers/productsController")

productsRouter.get("/", productsController.productsListGet)
productsRouter.get("/:id", productsController.productGet)

module.exports = productsRouter