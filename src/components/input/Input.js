
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Input(props) {
  const [value, setValue] = React.useState(props.value);
  // Обработчик изменения инпута обновляет стейт
  function handleChange(e) {
    setValue(e.target.value);
  }

  //? Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    setValue(props.value);
  }, [currentUser, props.isOpen]);

  return (
    <div className="popup__field">
      {/* <!-- name --> */}
      <input
        value={value}
        onChange={handleChange}
        minLength={props.minLength}
        maxLength={props.maxLength}
        name={props.name}
        type={props.type}
        required={props.required}
        placeholder={props.placeholder}
        className="popup__input"
        id={`${props.id_name_popup}-input-${props.id_name}`}
      />
      {/* <!-- error-mesage --> */}
      <span
        className="popup__error-mesage"
        id={`${props.id_name_popup}-${props.id_name}-error-mesage`}
      ></span>
    </div>
  );
}

export default Input;
