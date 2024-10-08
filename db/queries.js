const pool = require("./pool")

async function getProduct(id) {
    console.log("ID", id)
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
    console.log(product, categoriesList, "QUERY DATA")
    return [product, categoriesList]
}

module.exports = {
    getProduct,
}