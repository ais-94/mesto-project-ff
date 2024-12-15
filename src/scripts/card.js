// @todo: Функция создания карточки
export function createCardAdd(item, userId, showImage, likeCard, deleteMyCard) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const cardLikeQuantity = cardElement.querySelector(".card__like-quantity");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.cardId = item._id;
  cardElement.ownerId = item.owner._id;
  cardTitle.textContent = item.name;

  cardLikeQuantity.textContent = item.likes.length;
  if (item.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, item._id);
  });

  //Нажатие изображение - открыть изображение на полный экран @
  cardImage.addEventListener("click", showImage);

  // @todo: Функция удаления карточки

  if (item.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) => {
      deleteMyCard(evt, item._id);
    });
  } else {
    deleteButton.disabled = true;
    deleteButton.classList.add("card__delete-button_disabled");
  }

  return cardElement;
}
