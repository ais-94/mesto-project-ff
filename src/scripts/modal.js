//Функция - открыть модальное окно
function openModal(popupModal) {
    popupModal.classList.add("popup_is-animated");
    popupModal.classList.add("popup_is-opened");
  }
  
  //Функция - закрыть модальное окно
function closeModal(popupModal) {
    popupModal.classList.remove("popup_is-opened");
  }
  
function test(a) {
if (a === 8)
   {return ("Hello!!")}
else 
{return ("Hello&&")}
 } 

  export {test, openModal, closeModal};
  test(6);
  console.log(test());