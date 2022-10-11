const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const ports = 2121

const app = express()

const conn = require('./db/Conn')

//MODELS
const Tought = require('./models/Tought')
const User = require('./models/User')

//ROUTES
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//CONTROLLER
const ToughtController = require('./controllers/TaughtController')

//TEMPLATE ENGINE
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//RECEBER RESPOSTA DO BODY
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//SESSION MIDDLEWARE
app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 36000,
        expires: new Date(Date.now + 3600000),
        httpOnly: true
    }
}),
)

//FLASH MESSAGES
app.use(flash())

//PUBLIC PATH
app.use(express.static('public'))

//SET SESSION TO RES
app.use((req, res, next) => {
    if(req.session.userId){
        res.locals.session = req.session
    }

    next()
})

//ROUTES
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

conn.sync().then(app.listen(ports)).catch((err) => console.log(err))
