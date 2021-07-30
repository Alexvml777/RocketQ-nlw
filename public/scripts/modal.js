//Exportar function Modal 
export default function Modal() {

    //Variaveis
    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')

    //Chama func para fechar a modal
    cancelButton.addEventListener("click", close)

    function open(){
        //Atribui a class active
        modalWrapper.classList.add("active")
    }
    function close(){
        //Remove a class active 
        modalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }
}