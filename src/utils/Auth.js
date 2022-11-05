
class Auth {
  constructor(setting) {
    this._adress = setting.baseUrl;
    this._headers = setting.headers;
  }

  //? аналочичен методу в api
  _checkResponse(res) {
    //? тут проверка ответа
    if (res.ok) {
      console.log('Запрос на сервер обработан удачно');
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //? регистрация или авторизация
  _sign(email, password, url) {
    return fetch(`${this._adress}/${url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      }),
    })
      //? проверяем
      .then(this._checkResponse)
  }

  //? регистрация
  registration(email, password) {
    return this._sign(email, password, "signup")
  }

  //? авторизация
  authorization(email, password) {
    this._sign(email, password, "signin")
      .then((data) => {
        localStorage.setItem('jwt', data.token)
      })
  }

  //? проверка токена
  validationJWT(token) {
    return fetch(`${this._adress}/users/me`, {
      headers:
        this._headers + {
          Authorization: `Bearer ${token}`
        },

    })
      //? проверяем
      .then(this._checkResponse)
  }
}

export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co', //? адресс сервера
  headers: {
    'Content-Type': 'application/json',
  },
});