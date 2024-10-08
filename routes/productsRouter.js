const { Router } = require("express")
const productsRouter = Router()
const productsController = require("../controllers/productsController")

productsRouter.get("/", productsController.productsListGet)
productsRouter.get("/:productId/detail", productsController.productGet)
productsRouter.get("/create", productsController.productCreateGet)

module.exports = productsRouter