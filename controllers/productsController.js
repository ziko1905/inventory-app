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
    res.render('product', { title: `${product.name} - info`, info: product, infoArr: categories})
})

module.exports = {
    productsListGet,
    productGet,
}