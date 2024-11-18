//Функция - открыть модальное окно
function openModal(popupModal) {
  popupModal.classList.add("popup_is-animated");
  
  //Действие: Закрыть модальное окно нажатием клавищи Esc
  document.addEventListener("keydown", handleEscape);

  setTimeout(() => {
    popupModal.classList.add("popup_is-opened");
  }, 1);
}

//Функция - закрыть модальное окно
function closeModal(popupModal) {
  popupModal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

//Функция закрыть окно нажатием Esc
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal };
