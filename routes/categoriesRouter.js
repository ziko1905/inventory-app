const { Router } = require("express")
const categoriesRouter = Router()
const categoriesController = require("../controllers/categoriesController")

categoriesRouter.get("/", categoriesController.categoriesListGet)
categoriesRouter.get("/create", categoriesController.categoryCreateGet)
categoriesRouter.get("/:categoryId", categoriesController.categoryGet)
categoriesRouter.get("/:categoryId/update", categoriesController.categoryUpdateGet)
categoriesRouter.post("/:categoryId/update", categoriesController.categoryUpdatePost)
categoriesRouter.post("/create", categoriesController.categoryCreatePost)

module.exports = categoriesRouter