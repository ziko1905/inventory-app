const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")

async function categoriesListGet(req, res) {
    const categories = await db.getAllCategories()
    res.render("listCategories", {title: "Categories list", categories: categories})
}

const categoryGet = asyncHandler(async (req, res) => {
    const id = req.params.categoryId
    const category = await db.getCategory(id)
    if (!category.length) throw new NotFoundError(`Couldn't find category with id: ${id}`)
    res.render("category", {title: `${category.name} - category info`, info: category})
})

function categoryCreateGet(req, res) {
    res.render("createCategory", {title: "Create Category"})
}

module.exports = {
    categoriesListGet,
    categoryGet,
    categoryCreateGet,
}