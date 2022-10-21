import React from 'react';
import Header from './header/Header.js';
import Main from './main/Main.js';
import Footer from './footer/Footer.js';
import PopupWithForm from './popupWithForm/PopupWithForm.js';
import ImagePopup from './imagePopup/ImagePopup.js';
import { api } from '../utils/Api.js';

import { CurrentUserContext } from './../contexts/CurrentUserContext.js';

//? импорт всех поп-ап`ов
import EditProfilePopup from './editProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './editAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './addPlacePopup/AddPlacePopup.js';

function App() {

  // хуки открытия поп-апов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);


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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
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
    api.setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        console.log('Имя и описание успешно обновлены');
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(newAvatar) {
    api.setUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        console.log('Аватар успешно обновлен');
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        console.log('Карточка успешно создана');
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* шапка сайта, блок header */}
      <Header />
      {/* контент сайта, блок content */}
      <Main
        cards={cards}
        handleCardLike={handleCardLike}
        handleCardDelete={handleCardDelete}
        onCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} />
      {/* подвал сайта, блок footer */}
      <Footer />

      {/* pop-up`ы сайта */}

      {/* avatar pop-up */}
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      {/* edit pop-up */}
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      {/* add pop-up */}
      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      {/*  
      <PopupWithForm
        name='add'
        popupTitle='Новое место'
        buttonTitle='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__field" id="popup__field-name">
          <input
            minLength="2"
            maxLength="30"
            name="name"
            type="text"
            required
            placeholder="Название"
            className="popup__input"
            id="add-input-name"
          />
          <span className="popup__error-mesage" id="add-name-error-mesage"></span>
        </div>
        <div className="popup__field">
          <input
            name="link"
            required
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input"
            id="add-input-info"
          />
          <span className="popup__error-mesage" id="add-info-error-mesage"></span>
        </div>
      </PopupWithForm>
      */}

      {/* Card pop-up */}
      <ImagePopup
        isOpen={isCardPopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      {/* delete pop-up */}
      <PopupWithForm
        name='delete'
        popupTitle='Вы уверены?'
        buttonTitle='Да'
        isOpen={false}
        onClose={closeAllPopups} />

    </CurrentUserContext.Provider >
  );
}

export default App;
