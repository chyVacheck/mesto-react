
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from '../input/Input.js';
import useForm from './../hooks/useForm.js';

function EditAvatarPopup(props) {

  const isEditAvatarPopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;

  const { values, handleChange, setValues } = useForm({
    avatar: '',
  });

  //? Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //? После загрузки текущего пользователя из API
  //? его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues('');
  }, [currentUser, isEditAvatarPopupOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(values.avatar);
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
        handleChange={handleChange}
        name={'avatar'}
        type={'url'}
        value={values.avatar}
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
