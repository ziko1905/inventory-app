const db = require("../db/queries")

function productsListGet(req, res) {
    // empty array until db is created
    res.render("listProducts", {title: "Products list", categories: [], products: []})
}

async function productGet(req, res) {
    const id = req.params.id
    const {product, categories} = db.getProduct(id)
    if (!product) throw `Couldn't find product with id: ${id}`
    res.render('product', { title: `${product.name} - info`, info: product, infoArr: categories})
}

module.exports = {
    productsListGet,
    productGet,
}