#! usr/bin/env node
const { Client } = require('pg')

const CREATE_PRODUCTS_TABLE = `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 20 ),
    stock_amount INTEGER,
    size VARCHAR (3),
    color VARCHAR ( 20 ),
    category_id INTEGER
);`

const CREATE_CATEGORIES_TABLE = `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 20 )
);`

const INSERT_CATEGORIES = `INSERT INTO categories (name)
    VALUES
    ('Bikes'),
    ('Clothing')
;`

const INSERT_PRODUCTS = `INSERT INTO products 
    (name, stock_amount, size, color, category_id) VALUES
        ('Pressure Gauge', 10, NULL, 'Black', NULL),
        ('Helmet', 4, 'L', 'Green', NULL),
        ('Hat', 15, 'M', 'Blue', 2),
        ('Specialized Enduro', 3, 'XL', 'Blue', 1),
        ('Trousers', 7, 'L', 'Red', 2)
;`

const SQL = CREATE_PRODUCTS_TABLE + CREATE_CATEGORIES_TABLE + INSERT_CATEGORIES + INSERT_PRODUCTS

const main = async (connectionString=process.argv[2]) => {
    console.log('sending...')
    const client = new Client({
        connectionString
    })

    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log('done')
}

main()