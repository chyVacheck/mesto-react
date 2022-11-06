
import React from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from '../input/Input.js';
import useForm from "../../hooks/useForm";

function AddPlacePopup({ onAddPlace, onClose, isOpen, isLoading }) {

  const { values, handleChange, setValues } = useForm({
    name: '',
    link: ''
  });

  //? обнуляем значения при открытии pop-ap 
  React.useEffect(() => {
    setValues({
      name: '',
      link: ''
    });
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='edit'
      popupTitle='Добавить место'
      buttonTitle={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* name */}
      <Input
        isOpen={isOpen}
        value={values.name}
        handleChange={handleChange}
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
        isOpen={isOpen}
        value={values.link}
        handleChange={handleChange}
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
