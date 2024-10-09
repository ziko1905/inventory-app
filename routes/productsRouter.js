const { Router } = require("express")
const productsRouter = Router()
const productsController = require("../controllers/productsController")

productsRouter.get("/", productsController.productsListGet)
productsRouter.get("/:productId/detail", productsController.productGet)
productsRouter.get("/:productId/update", productsController.productUpdateGet)
productsRouter.get("/create", productsController.productCreateGet)
productsRouter.post("/:productId/update", productsController.productUpdatePost)
productsRouter.post("/create", productsController.productCreatePost)
productsRouter.post("/:productId/delete", productsController.productDeletePost)

module.exports = productsRouter