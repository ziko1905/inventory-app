const { Router } = require("express")
const categoriesRouter = Router()
const categoriesController = require("../controllers/categoriesController")

categoriesRouter.get("/", categoriesController.categoriesListGet)
categoriesRouter.get("/create", categoriesController.categoryCreateGet)
categoriesRouter.get("/:categoryId", categoriesController.categoryGet)
categoriesRouter.get("/:categoryId/update", categoriesController.categoryUpdateGet)

module.exports = categoriesRouter