function PopupCard() {
  return (
    <>
      {/* <!-- * card pop-up --> */}
      <section id="popup-card" className="popup popup_background_darknes" >
        <article id="popup-card-container" className="popup__card">
          <img className="popup__card-image" />
          <h2 className="popup__card-title"></h2>
          <button
            aria-label="закрыть окно pop-up"
            type="button"
            id="card-button-close"
            className="popup__close-button button"
          ></button>
        </article>
      </section>
    </>
  )
}

export default PopupCard;
