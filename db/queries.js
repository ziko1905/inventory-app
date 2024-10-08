const pool = require("./pool")

async function getProduct(id) {
    const productPromise = new Promise((resolve, reject) => {
        pool.query("SELECT * FROM products WHERE id = $1", [id])
        .then(value => resolve(value.rows))
        .catch(err => reject(err))
    })

    const categoriesPromise = new Promise((resolve, reject) => {
        pool.query("SELECT categories.name FROM categories JOIN linker ON categories.id = linker.category_id JOIN products ON products.id = linker.product_id")
        .then(value => resolve(value.rows))
        .catch(err => reject(err))
    })
    
    const { product, categoriesList } = await Promise.all([productPromise, categoriesPromise])
    return [product, categoriesList]
}

async function getCategory(id) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [id])
    return rows
}

module.exports = {
    getProduct,
    getCategory,
}