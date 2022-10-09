
function Card(props) {

  return (<li className="elements__card">
    <button
      id="button-trash"
      aria-label="удалить карточку"
      type="button"
      className="elements__card-trash button"
    ></button>
    <button className="elements__card-image-button">
      <img className="elements__card-image" alt={props.name} src={props.link} />
    </button>
    <div className="elements__card-title-and-like">
      <h2 className="elements__card-title">{props.name}</h2>
      <div>
        <button
          id="button-like"
          aria-label="поставить или убрать лайк"
          type="button"
          className="elements__card-like button"
        ></button>
        <p className="elements__card-like-number">{props.length}</p>
      </div>
    </div>
  </li>)
}

export default Card;
