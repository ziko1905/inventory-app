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
    if (!category) throw new NotFoundError(`Couldn't find category with id: ${id}`)
    res.render("category", {title: `${category.name} - category info`, category: category})
})

function categoryCreateGet(req, res) {
    res.render("createCategory", {title: "Create Category"})
}

const categoryUpdateGet = asyncHandler(async (req, res) => {
    const id = req.params.categoryId
    const category = await db.getCategory(id)
    if (!category) throw new NotFoundError(`Couldn't find category with id: ${id}`)
    res.render("updateCategory", {title: `${category.name} - category update`, category: category})
})

module.exports = {
    categoriesListGet,
    categoryGet,
    categoryCreateGet,
    categoryUpdateGet,
}