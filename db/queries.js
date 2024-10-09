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

async function updateProduct(updatedProd) {
    await pool.query(`UPDATE products SET
                    name = $1,
                    stock_amount = $2,
                    color = $3,
                    size = $4,
                    category_id = $5
                  WHERE id = $6;`,
                [
                    updatedProd.name || null,
                    updatedProd.stockAmount || null, 
                    updatedProd.color || null,
                    updatedProd.size || null,
                    updatedProd.categoryId || null,
                    updatedProd.id
                ])
}

async function updateCategory(updatedCategory) {
    await pool.query(`UPDATE categories SET
                    name = $1
                  WHERE id = $2;`,
                [
                    updatedCategory.name || null,
                    updatedCategory.id
                ])
}

async function insertProduct(newProduct) {
    await pool.query(`INSERT INTO products
                        (name, stock_amount, size, color, category_id) VALUES 
                            ($1, $2, $3, $4, $5)`,
                        [
                            newProduct.name,
                            newProduct.stockAmount,
                            newProduct.size || null,
                            newProduct.color || null,
                            newProduct.categoryId || null
                        ])
}

async function insertCategory(newCategory) {
    await pool.query(`INSERT INTO categories 
                        (name) VALUES
                            ($1)`, [newCategory.name])
}

module.exports = {
    getAllProducts,
    getAllCategories,
    getProduct,
    getCategory,
    updateProduct,
    updateCategory,
    insertProduct,
    insertCategory

}