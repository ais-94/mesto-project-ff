import { deleteLike, addLike, deleteCard } from "./api";

// @todo: Функция создания карточки
export function createCardAdd(item, userId, showImage) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector("img");
  const cardTitle = cardElement.querySelector("h2");

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
      deleteCard(item._id)
        .then(() => {
          const listItem = evt.target.closest(".places__item");
          listItem.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    deleteButton.disabled = true;
    deleteButton.classList.add("card__delete-button_disabled");
  }
  return cardElement;
}

//Функция лайка карточки
function likeCard(evt, cardId) {
  const likeQuantity = evt.target.parentNode.querySelector(
    ".card__like-quantity"
  );
  if (evt.target.classList.contains("card__like-button")) {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      deleteLike(cardId)
        .then((likeData) => {
          evt.target.classList.remove("card__like-button_is-active");
          likeQuantity.textContent = likeData.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLike(cardId)
        .then((likeData) => {
          evt.target.classList.add("card__like-button_is-active");
          likeQuantity.textContent = likeData.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
