import React from 'react';
import Header from './header/Header.js';
import Main from './main/Main.js';
import Footer from './footer/Footer.js';
import PopupWithForm from './popupWithForm/PopupWithForm.js';
import ImagePopup from './imagePopup/ImagePopup.js';

function App() {

  // хуки открытия поп-апов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    console.log('Нажали на аватар');
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    console.log('Нажали на редактирование профиля');
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    console.log('Нажали на кнопку добавления карточки');
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }

  return (
    <>
      {/* <!-- ! шапка сайта, блок header --> */}
      <Header />
      {/* <!-- ! контент сайта, блок content --> */}
      <Main
        onCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} />
      {/* <!--  ! подвал сайта, блок footer --> */}
      <Footer />

      {/*! pop-up сайта --> */}

      {/* avatar pop-up */}
      <PopupWithForm
        name='avatar'
        popupTitle='Редактировать профиль'
        buttonTitle='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__field">
          <input
            name="avatar"
            required
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input"
            id="avatar-input-info"
          />
          {/* <!-- error-mesage --> */}
          <span className="popup__error-mesage" id="avatar-info-error-mesage"></span>
        </div>
      </PopupWithForm>

      {/* edit pop-up */}
      <PopupWithForm
        name='edit'
        popupTitle='Редактировать профиль'
        buttonTitle='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {/* <!-- name --> */}
        <div className="popup__field">
          {/* <!-- name --> */}
          <input
            minLength="2"
            maxLength="40"
            name="name"
            type="text"
            required
            placeholder="Введите имя"
            className="popup__input"
            id="edit-input-name"
          />
          {/* <!-- error-mesage --> */}
          <span
            className="popup__error-mesage"
            id="edit-name-error-mesage"
          ></span>
        </div>
        {/* <!-- info --> */}
        <div className="popup__field">
          <input
            minLength="2"
            maxLength="200"
            type="text"
            name="about"
            required
            placeholder="Введите информацию о вас"
            className="popup__input"
            id="edit-input-info"
          />
          {/* <!-- error-mesage --> */}
          <span
            className="popup__error-mesage"
            id="edit-info-error-mesage"
          ></span>
        </div>
      </PopupWithForm>

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
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
