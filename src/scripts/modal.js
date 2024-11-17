//Функция - открыть модальное окно
function openModal(popupModal) {
    popupModal.classList.add("popup_is-animated");
    popupModal.classList.add("popup_is-opened");
  }
  
  //Функция - закрыть модальное окно
function closeModal(popupModal) {
    popupModal.classList.remove("popup_is-opened");
  }


  export {openModal, closeModal};
