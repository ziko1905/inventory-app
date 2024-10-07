function categoriesListGet(req, res) {
    res.render("listCategories", {title: "Categories list", categories: []})
}

module.exports = {
    categoriesListGet,
}