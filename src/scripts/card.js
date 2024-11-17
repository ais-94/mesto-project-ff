import { cardTemplate, form, listSectionUl, modalElementAdd } from "./index.js";
import { closeModal, openModal } from "./modal.js";
const popupPhotoContainer = document.querySelector(".popup_type_image"); //есть в index.js
const imagePopup = popupPhotoContainer.querySelector(".popup__image"); //фото в модальном окне (display: block)
const imagename = popupPhotoContainer.querySelector(".popup__caption"); //подпись к фото
const popupPhotoClose = popupPhotoContainer.querySelector(".popup__close"); //кнопка закрыть модальное окно фото

// @todo: Функция создания карточки
function createCard(item, handleDelete) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector("img").src = item.link;
  cardElement.querySelector("img").alt = item.name; //Alt
  cardElement.querySelector("h2").textContent = item.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);

  const likeButton = cardElement.querySelector(".card__like-button");

  //Нажатие кнопки лайка - закрашивание
  likeButton.addEventListener("click", cardisliked);

  //открыть фото
  const popupPhoto = cardElement.querySelector(".card__image");
  popupPhoto.addEventListener("click", function () {
    openModal(popupPhotoContainer);
    imagePopup.src = item.link;
    imagePopup.alt = item.name;
    imagename.textContent = item.name;
  });

  popupPhotoClose.addEventListener("click", function () {
    closeModal(popupPhotoContainer);
  });

  return cardElement;
}

//  Функция лайка
function cardisliked(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// @todo: Функция удаления карточки
function cardDelete(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}

//функция - добавить карточку из модального окна
function handleAddCard(evt) {
  evt.preventDefault();
  const name = form.querySelector(".popup__input_type_card-name").value;
  const link = form.querySelector(".popup__input_type_url").value;
  const element = {
    name: name,
    link: link,
  };
  const cardItem = createCard(element, cardDelete);
  listSectionUl.prepend(cardItem);
  form.reset();
  closeModal(modalElementAdd);
}

export { createCard, cardisliked, cardDelete, handleAddCard };
