import "../pages/index.css";
import { openModal, closeModal } from "./modal.js";
import { initialCards } from "./cards.js";
import { createCard, deleteCard } from "./card.js";

// @todo: DOM узлы
const listSectionUl = document.querySelector(".places__list");

//Модальное окно/кнопки/поля ввода для редактирования профиля
const modalEdit = document.querySelector(".popup_type_edit"); //*Модальное окно редактирования профиля
const profileForm = document.querySelector(".popup__form"); //форма для ввода данных редактирования профиля
const buttonEdit = document.querySelector(".profile__edit-button"); //кнопка редактировать профиль

//Модальное окно/кнопки/поля ввода (добавить карточку)
const buttonAdd = document.querySelector(".profile__add-button"); //кнопка открыть модальное окно"+" добавить карточку
const modalElementAdd = document.querySelector(".popup_type_new-card"); //*Модальное окно добавить карточку
const cardForm = document.forms["new-place"]; //форма для ввода данных карточки

//все модальные окна
const popups = document.querySelectorAll(".popup");

//Модальное окно фотографий
const popupPhotoContainer = document.querySelector(".popup_type_image"); //блок модального окна открытой фотографии  (display: block)
const imagePopup = popupPhotoContainer.querySelector(".popup__image"); //фото в модальном окне (display: block)
const imagename = popupPhotoContainer.querySelector(".popup__caption"); //подпись к фото

// Получите значение полей jobInput и nameInput из свойства value
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

// Выберите элементы, куда должны быть вставлены значения полей
const profile = document.querySelector(".profile__info");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");


//Функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const person = {
    personName: nameInput.value,
    occupation: jobInput.value,
  };
  // Вставьте новые значения с помощью textContent
  profileName.textContent = person.personName;
  profileJob.textContent = person.occupation;
  closeModal(modalEdit);
}

//функция - добавить карточку из модального окна
function handleAddCard(evt, method = "prepend") {
  evt.preventDefault();
  const name = cardForm.querySelector(".popup__input_type_card-name").value;
  const link = cardForm.querySelector(".popup__input_type_url").value;
  const element = {
    name: name,
    link: link,
  };
  const cardItem = createCard(element, deleteCard, handleImageClick);
  listSectionUl[method](cardItem);
  cardForm.reset();
  closeModal(modalElementAdd);
}

// @todo: Функция окрыть фото
function handleImageClick(evt) {
  const imageItem = evt.target.closest(".card__image");
  openModal(popupPhotoContainer);
  imagePopup.src = imageItem.src;
  imagePopup.alt = imageItem.alt;
  imagename.textContent = imageItem.alt;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const cardItem = createCard(element, deleteCard, handleImageClick);
  listSectionUl.prepend(cardItem);
});

//Действие: обработчик событий добавить карточку в список вручную
cardForm.addEventListener("submit", handleAddCard);

//Действие: обработчик событий: отправка измененных данных профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Действие: Клик открыть модальное редактировать профиль
buttonEdit.addEventListener("click", function () {
  openModal(modalEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Действие: Клик открыть модальное окно добавления карточки
buttonAdd.addEventListener("click", function () {
  openModal(modalElementAdd);
});

//Закрыть модальные окна нажатием на оверлей и крестик
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

//Действие: Закрыть модальное окно нажатием клавищи Esc
//document.addEventListener("keydown", handleEscape);


