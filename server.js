import express from "express"
import { getAll, findOne, saveData, update, deleteOne } from "./database.js"

const app = express()
app.use(express.json())
app.get("/books", async (req, res) => {
    const method = req.method
    const url = req.url
    console.log({ method, url })
    const books = await getAll()
    res.send(books)
})
app.get("/books/:id", async (req, res) => {
    const method = req.method
    const url = req.url
    console.log({ method, url })
    const {id} = req.params
    const book = await findOne(id)
    if (book === null) {
        res.status(404)
        res.send({ message: `NOT FOUND SUCH AN ID ${id}` })
    }
    res.send(book)
})
app.post("/books", async (req, res) => {
    const method = req.method
    const url = req.url
    console.log({ method, url })
    const updatedBook = req.body
    console.log(req.body)
    if (!updatedBook.hasOwnProperty("title") || !updatedBook.hasOwnProperty("author") || !updatedBook.hasOwnProperty("year")) {
        res.status(400)
        res.send({ message: "BAD REQUEST, PLEASE add the properties of a book fully!" })
    }
    if (updatedBook.title === null || updatedBook.author === null || updatedBook.year === null) {
        res.status(400)
        res.send({ message: "BAD REQUEST, PLEASE add the properties of a book fully!" })
    }
    const book = await saveData(updatedBook)
    res.send(book)
})
app.put("/books/:id", async (req, res) => {
    const method = req.method
    const url = req.url
    console.log({ method, url })
    const { id } = req.params
    const updatedBook = req.body
    const book = await update(id, updatedBook)
    if(book === null){
        res.status(404)
        res.send({ message: `NOT FOUND SUCH AN ID ${id}` })
    }
    res.send(book)
})
app.delete("/books/:id", async (req,res)=>{
    const method = req.method
    const url = req.url
    console.log({ method, url })
    const { id } = req.params
    const book = await deleteOne(id)
    if (book === null) {
        res.status(404)
        res.send({ message: `NOT FOUND SUCH AN ID ${id}` })
    }
    res.send(book)
})
app.listen(4000, ()=>{
    console.log("Server is running on the port of 4000 properly")
})