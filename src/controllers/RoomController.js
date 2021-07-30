//Imports
const Database = require("../db/config")

module.exports = {
    async create(req, res){
        //Inicia o db 
        const db = await Database()
        //Variaveis
        const pass = req.body.password
        let roomId
        let isRoom = true

        /* Gera numero da sala enquanto verdadeiro */
        while(isRoom){
            //Gera os numeros da sala
            for(var i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
            }
            /* Verifica se o numero ja existe */
            const roomsExistsIds = await db.all(`SELECT id FROM rooms`)
            /* Verifica numero um a um com a func '.some' */
            isRoom = roomsExistsIds.some(roomExistId => roomExistId === roomId)
            /* Insere numero da sala na tabela se nao existir */
            if(!isRoom){
                // Inseria sala no banco
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                )VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }
        
        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    /* Add numero da sala no front ${roomId} */
    async open(req, res){
        //Inicia o db 
        const db = await Database()
        // Define a variavel roomId
        const roomId = req.params.room
        //Traz somente as perguntas com o num da sala correto
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }

        // Renderiza o valor da variavel aonde for chamada
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})

    },
    enter(req, res){
        const roomId = req.body.roomId
        
        res.redirect(`/room/${roomId}`)
    }
}