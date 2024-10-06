const { Router } = require("express")
const productsRouter = Router()

productsRouter.get("/", (req, res) => {
    res.send("App sending")
})

module.exports = productsRouter