const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const db = require('./data/db')
const Post = require("./data/Post");

routes.get('/', (req, res) => {
    return res.render('create.html')
})

routes.get("/posts", async(req, res) => {
    db.all(`SELECT * FROM posts`, (err, rows) => {
        if (err) {
            return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
        }
        console.log('\x1b[36m[database] Dados Requisitados\x1b[0m')
        var colunm1 = new Array()
        var colunm2 = new Array()
        var colunm3 = new Array()
        var numberColunm
        if (rows.length > 10) {
            for (let i = 0; i < Math.floor(rows.length / 2); i++) {
                const image = rows[i];
                colunm1.push(image)
            }
            for (let i = Math.floor(rows.length / 2); i < rows.length; i++) {
                const image = rows[i];
                colunm2.push(image)
            }
            var numberColunm = 2
        } else {
            for (let i = 0; i < Math.floor(rows.length / 3); i++) {
                const image = rows[i];
                colunm1.push(image)
            }
            for (let i = Math.floor(rows.length / 3); i < Math.floor(rows.length / 3) * 2; i++) {
                const image = rows[i];
                colunm2.push(image)
            }
            for (let i = Math.floor(rows.length / 3) * 2; i < rows.length; i++) {
                const image = rows[i];
                colunm3.push(image)
            }
            var numberColunm = 3
        }
        const colunm = {
                colunm1,
                colunm2,
                colunm3
            }
            // return res.json({ total: rows.length, colunm, dividido: Math.floor(rows.length / 3)})
        return res.render('post-list.html', { posts: rows, total: rows.length, colunm, numberColunm });
    });

});

routes.post("/posts", multer(multerConfig).single("file"), async(req, res) => {
    if (!req.file) {
        return res.render('create.html', { error: true });
    }
    const { originalname: name, size, key, location: url = "" } = req.file;


    await Post.create({ name, size, key, url })
    return res.render('create.html', { saved: true });

});

routes.delete("/posts/:id", async(req, res) => {
    const post = await Post.findById(req.params.id);

    if (await Post.remove(post)) {
        return res.status(200).send();
    } else {
        return res.status(500).send('Error');
    }

});

module.exports = routes;