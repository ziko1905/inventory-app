const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")

async function productsListGet(req, res) {
    const search = req.query.search
    const categoryId = req.query.categoryId

    const [ products, categories ] = await Promise.all([db.getAllProducts(search, categoryId), db.getAllCategories()])
    await Promise.all(products.map(async (prod) => {
        prod.category = await db.getCategory(prod.id)
        if (prod.category) prod.category = prod.category.name
        return prod
    }))

    res.render("listProducts", {title: "Products list", products: products, categories: categories})
}

const productGet = asyncHandler(async (req, res) => {
    const id = req.params.productId
    const product = await db.getProduct(id)
    if (!product) throw new NotFoundError(`Couldn't find product with id: ${id}`)
    product.category = await db.getCategory(product.category_id).then(resolve => resolve.name)
    console.log(product)
    res.render('product', { title: `${product.name} - product info`, product: product})
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