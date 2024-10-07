const express = require("express")
const path = require("path")
const productsRouter = require("./routes/productsRouter")
const categoriesRouter = require("./routes/categoriesRouter")
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/", productsRouter)
app.use("/categories", categoriesRouter)
app.use((err, req, res, next) => {
    console.log(err)
    res.render("errorPage", { title: "Error Occurred" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Express app listening on port:", PORT, "!"))