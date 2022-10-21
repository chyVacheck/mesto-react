
import React from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from '../input/Input.js';

function AddPlacePopup(props) {

  const isEditProfilePopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  //? обнуляем значения при открытии pop-ap 
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isEditProfilePopupOpen]);


  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='edit'
      popupTitle='Редактировать профиль'
      buttonTitle='Сохранить'
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
    >
      {/* name */}
      <Input
        isOpen={isEditProfilePopupOpen}
        value={name}
        setValue={setName}
        name={'name'}
        type={'text'}
        minLength={2}
        maxLength={30}
        required={true}
        placeholder={'Название'}
        id_name_popup={'add'}
        id_name={'name'}
      />

      {/* url */}
      <Input
        isOpen={isEditProfilePopupOpen}
        value={link}
        setValue={setLink}
        name={'link'}
        type={'url'}
        minLength={null}
        maxLength={null}
        required={true}
        placeholder={'Ссылка на картинку'}
        id_name_popup={'add'}
        id_name={'info'}
      />

    </PopupWithForm >
  )
}

export default AddPlacePopup;
