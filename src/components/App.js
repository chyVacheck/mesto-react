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

function App() {

  // хуки открытия поп-апов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* шапка сайта, блок header */}
      <Header />
      {/* контент сайта, блок content */}
      <Main
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
      <PopupWithForm
        name='add'
        popupTitle='Новое место'
        buttonTitle='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        {/* <!-- name --> */}
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
          {/* <!-- error-mesage --> */}
          <span className="popup__error-mesage" id="add-name-error-mesage"></span>
        </div>
        {/* <!-- url --> */}
        <div className="popup__field">
          <input
            name="link"
            required
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input"
            id="add-input-info"
          />
          {/* <!-- error-mesage --> */}
          <span className="popup__error-mesage" id="add-info-error-mesage"></span>
        </div>
      </PopupWithForm>

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
