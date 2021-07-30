//Imports
const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

//Cria a rota para o  express
const route = express.Router()

//Definindo as rotas
route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

//Rota para salas criadas
route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
// entrar em sala criada
route.post('/enterroom', RoomController.enter)

// Rota para os dados do form
route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index)


//importando route para o server
module.exports = route