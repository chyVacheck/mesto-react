
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from '../input/Input.js';

function EditAvatarPopup(props) {

  const isEditAvatarPopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;

  const [avatar, setAvatar] = React.useState("");

  //? Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //? После загрузки текущего пользователя из API
  //? его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setAvatar('');
  }, [currentUser, isEditAvatarPopupOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='avatar'
      popupTitle='Обновить аватар'
      buttonTitle='Сохранить'
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
    >
      {/* name */}
      <Input
        isOpen={isEditAvatarPopupOpen}
        setValue={setAvatar}
        name={'avatar'}
        type={'url'}
        value={avatar}
        minLength={null} //? в данном случае не нужны
        maxLength={null} //? в данном случае не нужны
        required={true}
        placeholder={'Ссылка на картинку'}
        id_name_popup={'avatar'}
        id_name={'info'}
      />
    </PopupWithForm >
  )
}

export default EditAvatarPopup;
