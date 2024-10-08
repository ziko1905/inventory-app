const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")
const { body, validationResult } = require("express-validator")

const validateProduct = [
    body("name").trim()
        .notEmpty()
        .withMessage("Product must have a name")
        .isString()
        .withMessage("Product name must be string"),

    body("stockAmount")
        .notEmpty()
        .isNumeric()
        .withMessage("Must be whole number")
        .isFloat({min: 0}),
]

const productsListGet = asyncHandler(async (req, res) => {
    const search = req.query.search
    const categoryId = req.query.categoryId

    const [ products, categories ] = await Promise.all([db.getAllProducts(search, categoryId), db.getAllCategories()])
    await Promise.all(products.map(async (prod) => {
        prod.category = await db.getCategory(prod.category_id)
        if (prod.category) prod.category = prod.category.name
        return prod
    }))

    res.render("listProducts", {title: "Products list", products: products, categories: categories})
})

const productGet = asyncHandler(async (req, res) => {
    const id = req.params.productId
    const product = await db.getProduct(id)
    if (!product) throw new NotFoundError(`Couldn't find product with id: ${id}`)
    product.category = await db.getCategory(product.category_id).then(resolve => {
        if (resolve) return resolve.name
        return resolve
    })

    res.render('product', { title: `${product.name} - product info`, product: product})
})

const productCreateGet = asyncHandler(async (req, res) => {
    const categories = await db.getAllCategories()
    res.render("createProduct", {title: "Create New Product", categories: categories})
})

const productUpdateGet = asyncHandler(async (req, res) => {
    const id = req.params.productId
    const [product, categories]  = await Promise.all([db.getProduct(id), db.getAllCategories()])
    if (!product) throw new NotFoundError(`Couldn't find product with id: ${id}`)
    product.category = await db.getCategory(product.category_id)
    res.render('updateProduct', {title: `${product.name} - product update`, product: product, categories: categories})
})

const productUpdatePost = [
    validateProduct,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new Error(errors.array().map(e => e.msg).join(", "))
        await db.updateProduct(req.body)
        res.redirect("/")
    })
]

const productCreatePost = [
    validateProduct,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) throw new Error(errors.array().map(e => e.msg).join(", "))
        await db.insertProduct(req.body)
        res.redirect("/")
    })
]

const productDeletePost = asyncHandler(async (req, res) => {
    await db.deleteProduct(req.params.productId)
    res.redirect("/")
})

module.exports = {
    productsListGet,
    productGet,
    productCreateGet,
    productUpdateGet,
    productUpdatePost,
    productCreatePost,
    productDeletePost,
}