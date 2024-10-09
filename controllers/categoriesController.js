const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")
const { body, validationResult } = require("express-validator")

const validateCategory = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name field empty but is required")
    .isString()
    .withMessage("Name field not a string")
]

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

const categoryUpdatePost = [
    validateCategory,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new Error(errors.array().map(e => e.msg).join(", "))
        const category = await db.updateCategory(req.body)
        res.redirect("/categories")
})
]

const categoryCreatePost = [
    validateCategory,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new Error(errors.array().map(e => e.msg).join(", "))
        const category = await db.insertCategory(req.body)
        res.redirect("/categories")
    })
]

const categoryDeletePost = asyncHandler(async (req, res) => {
    const category = await db.deleteCategory(req.params.categoryId)
    res.redirect("/categories")
})


module.exports = {
    categoriesListGet,
    categoryGet,
    categoryCreateGet,
    categoryUpdateGet,
    categoryUpdatePost,
    categoryCreatePost,
    categoryDeletePost,
}