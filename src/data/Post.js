const db = require('./db')

const Post = {
    create: ({ name, size, key, url }) => {
        const values = [name, size, key, url]
        console.log(values)
        db.run(`INSERT INTO posts (name, size, key, url) VALUES (?,?,?,?);`, values, (err) => {
            if (err) {
                console.log('\x1b[31m[Database]' + err + '\x1b[0m')
                return false
            }
            console.log('\x1b[32m[Database]Cadastrado com Sucesso\x1b[0m')
            console.log(this)
            return true
        })
    },
    findById: id => {
        db.all(`SELECT * FROM posts WHERE id = ${id}`, (err, rows) => {
            if (err) {
                return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
            }
            console.log('\x1b[36m[database] Dados Requisitados\x1b[0m')
            return rows
        })
    },
    remove: post => {
        db.run(`DELETE FROM posts WHERE id = ?`, [post.id], (err) => {
            if (err) {
                console.log('\x1b[31m[Database]' + err + '\x1b[0m')
                return new Error(err)
            }
            console.log('\x1b[32m[Database]Deletado com Sucesso\x1b[0m')
            return true
        })
    }
}
module.exports = Post