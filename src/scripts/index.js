import "../pages/index.css";
import { openModal, closeModal } from "./modal.js";
import { createCardAdd } from "./card";
import { enableValidation, clearValidation } from "./validation.js";
import {
  changeAvatar,
  getInitialCards,
  getUsetInfo,
  changeUsersData,
  AddCardPost,
  addLike,
  deleteLike,
  deleteCard,
} from "./api.js";

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
const avatarForm = document.querySelector(".popup__form__avatar"); //форма для ввода данных редактирования профиля
const avatarInput = avatarForm.querySelector(".popup__input_type_url_avatar");

// Выберите элементы, куда должны быть вставлены значения полей
const profile = document.querySelector(".profile__info");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__description");

const buttonAvatar = document.querySelector(".profile__image");
const modalAvatar = document.querySelector(".popup_type_avatar");
const profileAvatarInput = document.querySelector(
  ".popup__input_type_url_avatar"
);

let userId = "";

const validationConfig = {
  formSelector: ".popup__form", //
  inputSelector: ".popup__input", //
  submitButtonSelector: ".popup__button", //
  inactiveButtonClass: "popup__button_disabled", //
  inputErrorClass: "popup__input_type_error", //
  errorClass: "popup__error_visible", //
};

// @todo: Функция окрыть фото
function handleImageClick(evt) {
  const imageItem = evt.target.closest(".card__image");
  openModal(popupPhotoContainer);
  imagePopup.src = imageItem.src;
  imagePopup.alt = imageItem.alt;
  imagename.textContent = imageItem.alt;
}

// Функция принимает в вызов карточку и метод вставки @
function renderCard(item, userId, handleImageClick) {
  // создаем карточку, передавая обработчики в виде объекта `callbacks`
  const cardElement = createCardAdd(
    item,
    userId,
    handleImageClick,
    likeCard,
    deleteMyCard
  );
  // вставляем карточку, используя метод (вставится `prepend` или `append`)
  //listSectionUl[ method ](cardElement);
  listSectionUl.append(cardElement);
}
export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//Функция добавить карточку
function handleAddCard(evt) {
  evt.preventDefault();
  const button = cardForm.querySelector(".popup__button");
  const name = cardForm.querySelector(".popup__input_type_card-name").value;
  const link = cardForm.querySelector(".popup__input_type_url").value;
  renderLoading(true, button);
  AddCardPost({ name, link })
    .then((item) => {
      const cardElement = createCardAdd(
        item,
        userId,
        handleImageClick,
        likeCard,
        deleteMyCard
      );
      listSectionUl.prepend(cardElement);
      cardForm.reset();
      closeModal(modalElementAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      clearValidation(cardForm, validationConfig);
      renderLoading(false, button);
    });
}

//Функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = modalEdit.querySelector(".popup__button");
  renderLoading(true, button);
  const person = {
    personName: nameInput.value,
    occupation: jobInput.value,
  };
  changeUsersData(person)
    .then((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
      closeModal(modalEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      clearValidation(modalEdit, validationConfig);
      renderLoading(false, button);
    });
}

//Функция изменения аватара профиля @
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = avatarForm.querySelector(".popup__button");
  renderLoading(true, button);
  const person = profileAvatarInput.value;
  changeAvatar(person)
    .then((res) => {
      buttonAvatar.src = res.avatar;
      avatarForm.reset();
      closeModal(modalAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      clearValidation(modalEdit, validationConfig);
      renderLoading(false, button);
    });
}

//Функция лайка карточки
function likeCard(evt, cardId) {
  const likeQuantity = evt.target.parentNode.querySelector(
    ".card__like-quantity"
  );

  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : addLike;
  likeMethod(cardId)
    .then((likeData) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likeQuantity.textContent = likeData.likes.length;
    })
    .catch((err) => console.log(err));
}

//Функция удаления карточки вручную
function deleteMyCard(evt, itemid) {
  deleteCard(itemid)
    .then(() => {
      const listItem = evt.target.closest(".places__item");
      listItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Показать все карточки
Promise.all([getUsetInfo(), getInitialCards()])
  .then((res) => {
    const userInfo = res[0];
    userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    const initialCards = res[1];
    buttonAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    initialCards.forEach((card) => {
      renderCard(card, userId, handleImageClick);
    });
  })
  .catch((err) => {
    console.log(err);
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
    } else if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
    //clearValidation(popup, validationConfig)
  });
});

//Действие: Клик открыть модальное изменить аватар
buttonAvatar.addEventListener("click", function () {
  openModal(modalAvatar);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Вызов ф-ции валидации
enableValidation(validationConfig);
//hideInputError(validationConfig);
