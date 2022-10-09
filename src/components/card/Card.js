
function Card(props) {
  const name = props.name;
  const link = props.link;
  const length = props.length;

  function handleClick() {
    props.onCardClick(props.card);
  }


  return (
    <li className="elements__card">
      <button
        id="button-trash"
        aria-label="удалить карточку"
        type="button"
        className="elements__card-trash button"
      />
      <button className="elements__card-image-button" onClick={handleClick}>
        <img className="elements__card-image" alt={name} src={link} />
      </button>
      <div className="elements__card-title-and-like">
        <h2 className="elements__card-title">{name}</h2>
        <div>
          <button
            id="button-like"
            aria-label="поставить или убрать лайк"
            type="button"
            className="elements__card-like button"
          />
          <p className="elements__card-like-number">{length}</p>
        </div>
      </div>
    </li>)
}

export default Card;
