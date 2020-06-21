const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const db = require('./data/db')
const Post = require("./data/Post");

routes.get('/create', (req, res) => {
    return res.render('create.html')
})

routes.get("/", async(req, res) => {
    db.all(`SELECT * FROM posts`, (err, rows) => {
        if (err) {
            return console.log('\x1b[31m' + err + '\x1b[0m')
        }
        var colunm1 = new Array()
        var colunm2 = new Array()
        var colunm3 = new Array()
        var numberColunm
        for (let i = 0; i < rows.length; i++) {
            const image = rows[i];
            if (image.id % 2) {
                colunm2.push(image)
            } else {
                colunm1.push(image)
            }
        }
        const colunm = {
            colunm1,
            colunm2
        }
        return res.render('post-list.html', { posts: rows, total: rows.length, colunm });
    });

});

routes.post("/", multer(multerConfig).single("file"), async(req, res) => {
    if (!req.file) {
        return res.render('create.html', { error: true });
    }
    const { originalname: name, size, key, location: url = "" } = req.file;


    await Post.create({ name, size, key, url })
    return res.render('create.html', { saved: true });

});

routes.delete("/posts/:id", async(req, res) => {
    db.all(`SELECT * FROM posts WHERE id = ${req.params.id}`, async(err, rows) => {
        if (err) {
            return console.log('\x1b[31m' + err + '\x1b[0m');
        }
        const post = rows[0];
        return db.run(`DELETE FROM posts WHERE id = ${post.id}`, (err) => {
            if (err) {
                console.log('\x1b[31m' + err + '\x1b[0m')
                return res.status(500).send(err);
            }
            return res.status(200).json(post);
        })
    })
});
routes.get("/posts/:id", async(req, res) => {
    db.all(`SELECT * FROM posts WHERE id = ${req.params.id}`, async(err, rows) => {
        if (err) {
            return console.log('\x1b[31m' + err + '\x1b[0m');
        }
        const post = rows[0];
        return res.redirect('/' + post.key)
    })
});

module.exports = routes;