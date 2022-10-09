
class Api {
  constructor(setting) {
    this._adress = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkResponse(res) {
    // тут проверка ответа
    if (res.ok) {
      console.log('Запрос на сервер обработан удачно');
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //? возвращает данные о пользователе, используя ссылку 
  getUserInfo() {
    return fetch(`${this._adress}/cohort-50/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  //? устанавливает новые данные о пользователе (имя и описание)
  setUserInfo(user) {
    return fetch(`${this._adress}/cohort-50/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then(this._checkResponse)
  }

  //? устанавливает новый аватар пользователя
  setUserAvatar(avatar) {
    return fetch(`${this._adress}/cohort-50/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse)
  }

  //? возвращает массив карточек
  getCardArray() {
    return fetch(`${this._adress}/cohort-50/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  //? добавляет на сервер новую карточку
  addNewCard(card) {
    return fetch(`${this._adress}/cohort-50/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._checkResponse)
  }

  //? удаляет с сервера карточку
  deleteCard(card) {
    return fetch(`${this._adress}/cohort-50/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  //? добавляет/убирает лайк с карточки
  changeLike(card, userId) {
    let action = "PUT"
    card.likes.forEach((like) => {
      if (like._id == userId) {
        action = "DELETE"
      }
    })

    return fetch(`${this._adress}/cohort-50/cards/${card._id}/likes`, {
      method: action,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1', //? адресс сервера
  headers: {
    authorization: "6e341995-26c2-4e13-90fe-459da74d1f67",
    "Content-Type": "application/json",
  },
});
