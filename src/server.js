// Imports
const express = require('express')
const route = require('./route')
const path = require('path')

// Criar/iniciar o server
const server = express()

//Add módulo da template engine
server.set('view engine', 'ejs')

//Mostrando o caminho dos folders
// VIEWS
server.set('views', path.join(__dirname, 'views'))
// PUBLIC
server.use(express.static("public"))

//Definindo middleware para o form
server.use(express.urlencoded({extended: true}))

//Usando as rotas
server.use(route)

//Add porta p/ rodar o node
server.listen(3000, () => console.log("Running"))
