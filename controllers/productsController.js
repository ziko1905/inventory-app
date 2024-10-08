const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")

function productsListGet(req, res) {
    // empty array until db is created
    res.render("listProducts", {title: "Products list", categories: [], products: []})
}

const productGet = asyncHandler(async (req, res) => {
    const id = req.params.productId
    const {product, categories} = await db.getProduct(id)
    if (!product) throw new NotFoundError(`Couldn't find product with id: ${id}`)
    res.render('product', { title: `${product.name} - product info`, info: product, infoArr: categories})
})

const productCreateGet = asyncHandler(async (req, res) => {
    // empty until db query is developed
    res.render("createProduct", {title: "Create New Product", categories: []})
})

const productUpdateGet = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { product } = await db.getProduct(id)
    if (!product) throw new NotFoundError(`Couldn't find product with id: ${id}`)
    res.render('updateProduct', {title: `${product.name} - product update`, product: product})
})

module.exports = {
    productsListGet,
    productGet,
    productCreateGet,
    productUpdateGet
}