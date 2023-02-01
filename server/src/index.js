const db = require('./db')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express')

const app = express()
const accessTokenSecret = 'lol';
const activeTokens = [];

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    if (email == null || username == null || password == null) {
        res.sendStatus(400)
    } else {
        try {
            const query = {
                text: 'insert into users (email, username, password) values ($1, $2, $3)',
                values: [email, username, password]
            }
            const addUser = await db.query(query)
            console.log(addUser.rows[0])
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
        }
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const dbuser = await db.query(`select username, password from users where username='${username}'`)
        if (dbuser.rowCount < 1) {
            res.sendStatus(404)
        }
        if (dbuser.rows[0].password == password) {
            const accessToken = jwt.sign({ username: dbuser.rows[0].username, isAuth: true }, accessTokenSecret, { expiresIn: '20m' })

            activeTokens.push(accessTokenSecret);

            res.json({ accessToken })
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
    }

});


app.post('/logout', (req, res) => {
    activeTokens = activeTokens.filter(token => t !== req.headers.authorization.split(' ')[1]);
    res.send("Logout successful");
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/', authenticateJWT, (req, res) => {
    res.json({ "are in?": true });
});


app.listen(5000, () => {
    console.log("http://localhost:5000")
})