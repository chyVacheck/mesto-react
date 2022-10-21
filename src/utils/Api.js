
const myCohort = 'cohort-50';

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

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  //? возвращает данные о пользователе, используя ссылку 
  getUserInfo() {
    return this._request(`${this._adress}/${myCohort}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
  }

  //? устанавливает новые данные о пользователе (имя и описание)
  setUserInfo(user) {
    return this._request(`${this._adress}/${myCohort}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
  }

  //? устанавливает новый аватар пользователя
  setUserAvatar(avatar) {
    return this._request(`${this._adress}/${myCohort}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  //? возвращает массив карточек
  getCardArray() {
    return this._request(`${this._adress}/${myCohort}/cards`, {
      method: "GET",
      headers: this._headers,
    })
  }

  //? добавляет на сервер новую карточку
  addNewCard(card) {
    return this._request(`${this._adress}/${myCohort}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
  }

  //? удаляет с сервера карточку
  deleteCard(card) {
    return this._request(`${this._adress}/${myCohort}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  //? добавляет/убирает лайк с карточки
  changeLike(card, userId) {
    let action = "PUT"
    card.likes.forEach((like) => {
      if ((like._id === userId) && (action === "PUT")) {
        action = "DELETE"
      }
    })

    return this._request(`${this._adress}/cohort-50/cards/${card._id}/likes`, {
      method: action,
      headers: this._headers,
    })
  }
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1', //? адресс сервера
  headers: {
    authorization: "6e341995-26c2-4e13-90fe-459da74d1f67",
    "Content-Type": "application/json",
  },
});
