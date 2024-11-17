import "../pages/index.css";
import { test, openModal, closeModal } from "./modal.js";
import { initialCards } from "./cards.js";
import { createCard, cardDelete, handleAddCard } from "./card.js";
console.log(test(9));

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
export let listSectionUl = document.querySelector(".places__list");

//Модальное окно/кнопки/поля ввода для редактирования профиля
const modalEdit = document.querySelector(".popup_type_edit"); //*Модальное окно редактирования профиля
const closebuttonEdit = modalEdit.querySelector(".popup__close"); //кнопка закрыть без сохранения модальное окно редактирования профиля
const formElement = document.querySelector(".popup__form"); //форма для ввода данных редактирования профиля
const buttonEdit = document.querySelector(".profile__edit-button"); //кнопка редактировать профиль

//Модальное окно/кнопки/поля ввода (добавить карточку)
const buttonAdd = document.querySelector(".profile__add-button"); //кнопка открыть модальное окно"+" добавить карточку
export const modalElementAdd = document.querySelector(".popup_type_new-card"); //*Модальное окно добавить карточку
export const savecardbutton = modalElementAdd.querySelector(".popup__button"); //кнопка сохранить модальное окно Добавить карточку
const closebuttonAdd = modalElementAdd.querySelector(".popup__close"); //кнопка закрыть без сохранения модальное окно Добавить карточку
export const form = document.forms["new-place"]; //форма для ввода данных карточки

//Модальное окно фотографий
export const popupPhotoContainer = document.querySelector(".popup_type_image"); //блок модального окна открытой фотографии  (display: block)

//Функция изменения данных профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const nameInput = formElement.querySelector(".popup__input_type_name").value;
  const jobInput = formElement.querySelector(
    ".popup__input_type_description"
  ).value;
  const person = {
    personName: nameInput,
    occupation: jobInput,
  };
  // Выберите элементы, куда должны быть вставлены значения полей
  const profile = document.querySelector(".profile__info");
  // Вставьте новые значения с помощью textContent
  profile.querySelector(".profile__title").textContent = person.personName;
  profile.querySelector(".profile__description").textContent =
    person.occupation;
  closeModal(modalEdit);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const cardItem = createCard(element, cardDelete);
  listSectionUl.prepend(cardItem);
});

//Действие: обработчик событий добавить карточку в список вручную
form.addEventListener("submit", handleAddCard);

//Действие: обработчик событий: отправка измененных данных профиля
formElement.addEventListener("submit", handleFormSubmit);

//Действие: Клик открыть модальное редактировать профиль
buttonEdit.addEventListener("click", function () {
  openModal(modalEdit);
});

//Действие: Клик открыть модальное окно добавления карточки
buttonAdd.addEventListener("click", function () {
  openModal(modalElementAdd);
});

closebuttonAdd.addEventListener("click", function () {
  closeModal(modalElementAdd);
});

closebuttonEdit.addEventListener("click", function () {
  closeModal(modalEdit);
});

//Действие: Закрыть модальное окно нажатием клавищи Esc
document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    closeModal(modalElementAdd);
    closeModal(modalEdit);
    closeModal(popupPhotoContainer);
  }
});

//Действие: Закрыть модальное окно нажатием на оверлей:
//Действие: Окно добавления карточек
modalElementAdd.addEventListener("click", function (evt) {
  if (evt.target === modalElementAdd) {
    closeModal(modalElementAdd);
  }
});

//Действие: Окно изменения данных профиля
modalEdit.addEventListener("click", function (evt) {
  if (evt.target === modalEdit) {
    closeModal(modalEdit);
  }
});

//Действие: Окно фотографии
popupPhotoContainer.addEventListener("click", function (evt) {
  if (evt.target === popupPhotoContainer) {
    closeModal(popupPhotoContainer);
  }
});
