//Imports 
const Database = require('../db/config')

module.exports = {
   async index(req, res){
        //Inicia DB
        const db = await Database()
        //Variaveis
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password

        // Verifica se a senha está correta
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass == password){
            // Verifica se o id e igual da questão, entao apaga
            if(action == "delete"){
                
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

             //Verifica se o id e igual, então marca como lida 
            }else if(action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            // Add redirect da sala
            res.redirect(`/room/${roomId}`)
        }else {
            res.render('passincorrect', {roomId: roomId})
        }
         
    },

    // Pega dados do form e envia no db
    async create(req, res){
        // Inicia o db
        const db = await Database();
        //Variaveis
        const question = req.body.question
        const roomId = req.params.room

        // Insere os dados do form na tabela questions
        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)
        // Add redirect da sala
        res.redirect(`/room/${roomId}`)
    }
}