function productsListGet(req, res) {
    // empty array until db is created
    res.render("listProducts", {title: "Products list", categories: [], products: []})
}

module.exports = {
    productsListGet,
}