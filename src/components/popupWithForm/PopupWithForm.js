function PopupWithForm({
  isOpen, onClose, name, popupTitle, buttonTitle, children
}) {

  return (
    <>
      {/* pop-up */}
      <section id={`popup-${name}`} className={isOpen ? 'popup popup_opened' : 'popup'}>
        <article id={`popup-${name}-container`} className="popup__container">
          <h2 className="popup__title">{popupTitle}</h2>
          <form name={`${name}-form`} id={`${name}-popup-form`} noValidate>
            {/* all inputs */}
            {children}
            {/* submit */}
            <button
              disabled
              type="submit"
              id={`${name}-button-submit`}
              className="popup__submit-button popup__submit-button_invalid"
            >
              {buttonTitle}
            </button>
          </form>

          <button
            aria-label="закрыть окно pop-up"
            type="button"
            id={`${name}-button-close`}
            className="popup__close-button button"
            onClick={onClose}
          ></button>
        </article>
      </section>
    </>

  )
}

export default PopupWithForm;
