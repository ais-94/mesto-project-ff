// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// @todo: Функция создания карточки
function createCard(item, handleDelete, ShowImage) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector("img");
  const cardText = cardElement.querySelector("h2");
  cardImage.src = item.link;
  cardImage.alt = item.name; //Alt
  cardText.textContent = item.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);

  const likeButton = cardElement.querySelector(".card__like-button");

  //Нажатие кнопки лайка - закрашивание
  likeButton.addEventListener("click", likeCard);

//Нажатие изображение - открыть изображение на полный экран
  cardImage.addEventListener("click", ShowImage);

  return cardElement;
}

//  Функция лайка
function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}

export { createCard, likeCard, deleteCard };
