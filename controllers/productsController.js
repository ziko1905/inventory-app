const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const { NotFoundError } = require("../errors")

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
    console.log(product)
    res.render('product', { title: `${product.name} - product info`, product: product})
})

const productCreateGet = asyncHandler(async (req, res) => {
    // empty until db query is developed
    res.render("createProduct", {title: "Create New Product", categories: []})
})

const productUpdateGet = asyncHandler(async (req, res) => {
    const id = req.params.productId
    console.log(id)
    const [product, categories]  = await Promise.all([db.getProduct(id), db.getAllCategories()])
    if (!product) throw new NotFoundError(`Couldn't find product with id: ${id}`)
    product.category = await db.getCategory(product.category_id)
    res.render('updateProduct', {title: `${product.name} - product update`, product: product, categories: categories})
})

const productUpdatePost = asyncHandler(async (req, res) => {
    console.log(req.body)
    await db.updateProduct(req.body)
    res.redirect("/")
})

module.exports = {
    productsListGet,
    productGet,
    productCreateGet,
    productUpdateGet,
    productUpdatePost
}