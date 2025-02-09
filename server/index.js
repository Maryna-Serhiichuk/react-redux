const express = require('express')
const app = express()
const cors = require('cors')

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
app.use(cors({ origin: '*' }))

const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended:true});

const users = require('./source/users.json');
const todos = require('./source/todos.json');
const posts = require('./source/posts.json');

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

app.route('/posts')
    .get(( req, res ) => {
        res.json(posts)
    })
    .post(urlencodedParser, ( req, res ) => {
        const props = req.body
        console.log(props)
        res.json({ result: true })
    })
    
app.route('/todos')
    .get(( req, res ) => {
        res.json(todos)
    })

app.route('/users')
    .get(( req, res ) => {
        res.json(users)
    })

app.route('/users/:id')
    .get(( req, res ) => {
        const id = req.params.id
        const user = users.find(u => String(u.id) === String(id))
        res.json(user)
    })

app.route('/users/:id/todos')
    .get( ( req, res ) => {
        const id = req.params.id
        const todosResponse = todos.filter(t => String(t.userId) === String(id))
        res.json(todosResponse)
    })

app.route('/users/:id/posts')
    .get( ( req, res ) => {
        const id = req.params.id
        const postsResponse = posts.filter(t => String(t.userId) === String(id))
        res.json(postsResponse)
    })

app.route('/users/:id/albums')
    .get( ( req, res ) => {
        const id = req.params.id
        const todosResponse = todos.filter(t => String(t.userId) === String(id)).filter(t => !t.completed)
        res.json(todosResponse)
    })

const port = 3030
app.listen(port, () => {
    console.log(`listen port ${port}`)
})