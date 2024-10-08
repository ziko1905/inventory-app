const { Router } = require("express")
const productsRouter = Router()
const productsController = require("../controllers/productsController")

productsRouter.get("/", productsController.productsListGet)
productsRouter.get("/:productId/detail", productsController.productGet)

module.exports = productsRouter