const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")

function categoriesListGet(req, res) {
    res.render("listCategories", {title: "Categories list", categories: []})
}

const categoryGet = asyncHandler(async (req, res) => {
    const id = req.params.categoryId
    const category = await db.getCategory(id)
    if (!category.length) throw new NotFoundError(`Couldn't find category with id: ${id}`)
    res.render("category", {title: `${category.name} - category info`, info: category})
})

module.exports = {
    categoriesListGet,
    categoryGet,
}