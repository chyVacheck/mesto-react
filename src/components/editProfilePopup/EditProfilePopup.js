
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from '../input/Input.js';

function EditProfilePopup(props) {

  const isEditProfilePopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  //? Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //? После загрузки текущего пользователя из API
  //? его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isEditProfilePopupOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
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
        maxLength={40}
        required={true}
        placeholder={'Введите имя'}
        id_name_popup={'edit'}
        id_name={'name'}
      />

      {/* info */}
      <Input
        isOpen={isEditProfilePopupOpen}
        value={description}
        setValue={setDescription}
        name={'about'}
        type={'text'}
        minLength={2}
        maxLength={200}
        required={true}
        placeholder={'Введите информацию о вас'}
        id_name_popup={'edit'}
        id_name={'info'}
      />

    </PopupWithForm >
  )
}

export default EditProfilePopup;
