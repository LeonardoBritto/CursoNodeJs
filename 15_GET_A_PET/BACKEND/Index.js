const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

//Config JSON Response
//app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Salve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Public folder for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)