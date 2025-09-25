import fs from "node:fs/promises"
import path from "node:path"
import { existsSync } from "node:fs"
// 3. Ma’lumotlar bazasi
// books.json faylida saqlanadi.
// Dastur ishga tushganda agar fayl mavjud bo‘lmasa – avtomatik ravishda [] yoziladi.
// Har bir o‘zgarishdan keyin fayl yangilanadi.
const currentDir = process.cwd()
const databasePath = path.join(currentDir, "database.json")
if (existsSync(databasePath)) {
    console.log("Redirected to the existed Database Successfully!")
}
else {
    await fs.writeFile(databasePath, "[]")
    console.log("New Database created Successfully!")
}
//GetAll function
export async function getAll() {
    try{
        const data = await fs.readFile(databasePath, { encoding: "utf8" })
        const books = JSON.parse(data)
        console.log("ALL BOOKS ON THE DATABASE:", books)
        return books
    }catch (err) {
        throw new Error(`Error While Getting Users>>> ${err.message}`)
    }
}

//GetOne function 
export async function findOne(id) {
    try {
        const books = await getAll()
        const bookIndex = books.findIndex((b) => String(b.id) === String(id))
        if (bookIndex !== -1) {
            console.log("The searched book is found successfully: ", books[bookIndex])
            return books[bookIndex]
        }
        else {
            console.log("Not Found such an Id")
            return null
        }
    } catch (err) {
        throw new Error(`Error while getting one book from the database>>> ${err.message}`)
    }
}

//post function
export async function saveData(book) {
    try {
        let books = await getAll()
        let newBook = { id: Math.random().toString(36).substr(2, 9), ...book }
        books.push(newBook)
        await fs.writeFile(databasePath, JSON.stringify(books, null, 2))
        console.log("A new book has been created and added to the database")
        return books
    }catch (err) {
        throw new Error(`Error while posting the data... ${err.message}`)
    }
}

//update function
export async function update(id, data) {
    try {
        let books = await getAll()
        let Index =  books.findIndex(b => String(b.id) === String(id))
        if (Index !== -1) {
            let index = books.findIndex(b => String(b.id) === String(id))
            books[index] = { ...books[index], ...data }
            await fs.writeFile(databasePath, JSON.stringify(books, null, 2))
            console.log("The book has been updated successfully")
            return books
        }
        return null
    } catch (err) {
        throw new Error(`Error while posting the data... ${err.message}`)
    }
}

//deleteOne function
export async function deleteOne(id) {
    try{
        const books = await getAll()
        let index = books.findIndex(b => String(b.id) === String(id))
        if (index !== -1) {
            let bookIndex = books.indexOf(books[index])
            books.splice(bookIndex, 1)
            await fs.writeFile(databasePath, JSON.stringify(books))
            console.log(`The ${id} id numbered book has been deleted successfully! `)
            return books
        }
        else{
            return null
        }
    } catch (err) {
        throw new Error(`Error while deleting the data... ${err.message}`)
    }
}
