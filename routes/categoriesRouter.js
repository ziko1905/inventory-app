const { Router } = require("express")
const categoriesRouter = Router()
const categoriesController = require("../controllers/categoriesController")

categoriesRouter.get("/", categoriesController.categoriesListGet)
categoriesRouter.get("/create", categoriesController.categoryCreateGet)
categoriesRouter.get("/:categoryId", categoriesController.categoryGet)

module.exports = categoriesRouter