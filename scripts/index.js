// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const contain = document.querySelector(".content"); // находим main
const section = contain.querySelector(".page__section"); // находим секцию с кнопкой
const button = section.querySelector(".profile__add-button"); //кнопка
const page = document.querySelector(".page__content"); //page
const addButton = page.querySelector(".popup_type_new-card"); //*всплывающее окно
const closebutton = addButton.querySelector(".popup__close");
const savecardbutton = addButton.querySelector(".popup__button"); //содержимое всплывающего окна
const template = document.querySelector("#card-template");
const li_template = template.querySelector("li");

function addCardElement(element) {
  const page = document.querySelector(".page__content");
  const list_section = page.querySelector(".places");
  const list_section_ul = list_section.querySelector(".places__list");
  const template = document.querySelector("#card-template");

  // Клонируем содержимое тега <template>
  const item = template.content.cloneNode(true);

  // Находим тег <li> и помещаем текст внутрь
  const list_temp = item.querySelector("li");
  list_temp.querySelector("img").src = element.link;
  list_temp.querySelector("h2").textContent = element.name;
  list_section_ul.append(item);
  const deletecard = list_temp.querySelector(".card__delete-button");
  deletecard.addEventListener("click", deleteCard);
}
//Вывести карточки из массива на страницу
initialCards.forEach(addCardElement);

//Функция создания карточки
function addcard(e) {
  const name = document.querySelector(".popup__input_type_card-name").value;
  const link = document.querySelector(".popup__input_type_url").value;

  if (name && link) {
    e.preventDefault();

    const element = {
      name: name,
      link: link,
    };

    addCardElement(element);
    popup_close();
  }
}

//Функция открыть окно
function popup_open() {
  addButton.style.display = "flex";
}

//Функция закрыть окно
function popup_close() {
  addButton.style.display = "none";
}

//Клик открыть окно
button.addEventListener("click", function () {
  popup_open();
});

//Клик закрыть окно
closebutton.addEventListener("click", function () {
  popup_close();
});

savecardbutton.addEventListener("click", addcard);

//Удаление карточки
function deleteCard() {
  const revDiv = this.parentElement;
  revDiv.remove();
}
