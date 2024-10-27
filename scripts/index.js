// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
let listSectionUl = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, handleDelete) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector("img").src = item.link;
  cardElement.querySelector("img").alt = item.name; //Alt
  cardElement.querySelector("h2").textContent = item.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);
  return cardElement;
}

// @todo: Функция удаления карточки
function cardDelete(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const cardItem = createCard(element, cardDelete);
  listSectionUl.prepend(cardItem);
});