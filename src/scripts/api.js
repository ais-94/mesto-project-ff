const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "87499e0d-719b-4d6f-84c9-6ddaa82af35b",
    "Content-Type": "application/json",
  },
};

// проверка ответа от сервера
export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

// проверка ответа
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

//Данные пользователя
export const getUsetInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

//Изменение данных пользователя
export const changeUsersData = (person) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: person.personName,
      about: person.occupation,
    }),
  }).then(handleResponse);
};

//Добавление новой карточки
export const addCardPost = (cards) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cards.name,
      link: cards.link,
    }),
  }).then(handleResponse);
};

//Загрузка аватара
export const changeAvatar = (person) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: person,
    }),
  }).then(handleResponse);
};

// удаление карточки с сервера
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

// Поставить лайк
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

//Убрать лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};
