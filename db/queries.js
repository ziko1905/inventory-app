const pool = require("./pool")

async function getProduct(id) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1`, [id])
    return rows[0]
}

async function getCategory(id) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [id])
    return rows[0]
}

async function getAllProducts(search, categoryId) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE name LIKE $1 AND ($2 = -1 OR category_id = $2)`, [search ? `%${search}%` : "%%", 
        categoryId != undefined ? categoryId : -1])
    return rows
}

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories")
    return rows
}

module.exports = {
    getAllProducts,
    getAllCategories,
    getProduct,
    getCategory,
}