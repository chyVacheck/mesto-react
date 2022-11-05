
import React from 'react';
import ProtectedRoute from './protectedRouter/ProtectedRouter.js';
import Header from './header/Header.js';
import Login from './login/Login.js';
import Register from './register/Register.js';
import Main from './main/Main.js';
import Footer from './footer/Footer.js';
import PopupWithForm from './popupWithForm/PopupWithForm.js';
import ImagePopup from './imagePopup/ImagePopup.js';
import InfoTooltip from './infoTooltip/InfoTooltip.js';
import { api } from '../utils/Api.js';

import successfulIcon from '../images/InfoTooltip/successful-icon.svg';
import unsuccessfulIcon from '../images/InfoTooltip/unsuccessful-icon.svg';

import { Routes, BrowserRouter, Navigate, Route } from 'react-router-dom';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';

//? импорт всех поп-ап`ов
import EditProfilePopup from './editProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './editAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './addPlacePopup/AddPlacePopup.js';

function App() {

  const state = {
    loggedIn: false
  }

  // хуки открытия поп-апов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  //? пользователь
  const [currentUser, setCurrentUser] = React.useState({});

  //? выбранная карточка
  const [selectedCard, setSelectedCard] = React.useState(null);

  //? массив всех карточек
  const [cards, setCards] = React.useState([]);

  //? Открыт хоть один поп-ап
  const isOpen = (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard);

  //? Ожидание ответа с сервера 
  const [isLoading, setIsLoading] = React.useState(false);

  //? запрос данных о пользователе
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса данных о пользователе');
        console.log(error);
      })
  },
    [] // для 1 лишь запуска
  )

  //? запрос на карточки
  React.useEffect(() => {
    api.getCardArray()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса карточек');
        console.log(error);
      })
  },
    [] //для только 1 запуска
  );

  //? вешаем слушатель нажатия кнопки Escape
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) { //? навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        console.log('Имя и описание успешно обновлены');
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.setUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        console.log('Аватар успешно обновлен');
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        console.log('Карточка успешно создана');
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    //? Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card, currentUser._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса лайка карточки');
        console.log('Id: ', card._id);
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    //? Отправляем запрос в API на удаление карточки
    api.deleteCard(card)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? false : true))
        )
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса на удаление карточки');
        console.log('Id: ', card._id);
        console.log(error);
      })
  }

  // для откладки
  function debug() {
    window.setIsEditAvatarPopupOpen = setIsEditAvatarPopupOpen;
    window.setIsEditProfilePopupOpen = setIsEditProfilePopupOpen;
    window.setIsAddPlacePopupOpen = setIsAddPlacePopupOpen;
    window.setIsCardPopupOpen = setIsCardPopupOpen;
    window.setIsInfoTooltipPopupOpen = setIsInfoTooltipPopupOpen;
  }

  // включить откладку
  if (1) {
    debug()
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* контент сайта, блок content */}
      <BrowserRouter>
        <Routes>
          {/* основной контент */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                loggedIn={false} //todo подставить реальное значение
              >
                {/* шапка сайта, блок header */}
                <Header />
                {/* основная часть сайта, блок main */}
                <Main
                  cards={cards}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                />
                {/* подвал сайта, блок footer */}
                <Footer />
              </ProtectedRoute>
            }>
          </Route>

          {/* регистрация */}
          <Route
            path='/signup'
            element={
              <>
                <Header>
                  <a className='header__link link' href='/signin'>Войти</a>
                </Header>
                <Register />
              </>
            }>
          </Route>

          {/* авторизация */}
          <Route
            path='/signin'
            element={
              <>
                <Header>
                  <a className='header__link link' href='/signup'>Регистрация</a>
                </Header>
                <Login />
              </>
            }>
          </Route>

          {/* все остальное */}
          <Route
            path="*"
            element={
              <Navigate to="/" />
            }>
          </Route>

        </Routes>
      </BrowserRouter >

      {/* pop-up`ы сайта */}

      {/* avatar pop-up */}
      <EditAvatarPopup
        isLoading={isLoading}
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      {/* edit pop-up */}
      <EditProfilePopup
        isLoading={isLoading}
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      {/* add pop-up */}
      <AddPlacePopup
        isLoading={isLoading}
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      {/* Card pop-up */}
      <ImagePopup
        isOpen={isCardPopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        img={successfulIcon} //todo поставить хук вместо константы
        message={'Вы успешно зарегистрировались!'}
        onClose={closeAllPopups}
      />

      {/* delete pop-up */}
      <PopupWithForm
        name='delete'
        popupTitle='Вы уверены?'
        buttonTitle='Да'
        isOpen={false}
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider >
  );
}

export default App;
