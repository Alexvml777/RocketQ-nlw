//Importando a function Modal
import Modal from './modal.js'

//Recebe a function Modal
const modal = Modal()

//Variaveis
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

/* Abre a modal quando (Marcar como lida) for clicado */
//Pega todos os buttons que existe com a class check
const checkButtons = document.querySelectorAll(".actions a.check")

//Percorre cada button marcado
checkButtons.forEach(button => {
    //Adiciona a escuta
    button.addEventListener("click", handleClick)
})

/* Abre a modal quando (Excluir) for clicado */
//Pega todos os buttons que existe com a class delete
const deleteButton = document.querySelectorAll(".actions a.delete")

//Percorre cada button marcado
deleteButton.forEach(button => {
    //Adiciona escuta
    button.addEventListener("click", (event) => handleClick(event, false))
})

// Muda conteudo da modal
function handleClick(event, check = true){
    //Variavel
    const text = check ? "Marcar como lida" : "Excluir"

    //Muda o conteudo da modal de acordo com a variavel
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML =  `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    
    //Muda a cor do botao dependendo da selecao
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red") 
    
    //Abrir modal
    modal.open()

    //Remove comportamento dos buttons como links
    event.preventDefault()


    //Pegando dados do FORM
    //Variaveis
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const form = document.querySelector(".modal form")
    const questionId = event.target.dataset.id
    
    //Passando valores
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
}