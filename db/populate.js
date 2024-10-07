#! usr/bin/env node
const { Client } = require("pg")

const CREATE_PRODUCTS_TABLE = `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 20 ),
    stock_amount INTEGER,
    size VARCHAR (3),
    color VARCHAR ( 20 )
);`

const CREATE_CATEGORIES_TABLE = `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 20 )
);`

const CREATE_LINKER_TABLE = `CREATE TABLE IF NOT EXISTS linker (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id INTEGER,
    category_id INTEGER
);`

const SQL = CREATE_PRODUCTS_TABLE + CREATE_CATEGORIES_TABLE + CREATE_LINKER_TABLE

const main = async (connectionString=process.argv[2]) => {
    console.log("sending...")
    const client = new Client({
        connectionString
    })

    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}

main()