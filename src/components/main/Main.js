
import React from "react";
import { api } from './../../utils/Api.js';
import Card from './../card/Card.js';
import defaultAvatar from '../../images/avatar.png'

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  const handleEditAvatarClick = props.onEditAvatar;

  const handleEditProfileClick = props.onEditProfile;

  const handleAddPlaceClick = props.onAddPlace;

  //? запрос на карточки
  React.useEffect(() => {
    api.getCardArray()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса карточек');
        console.log(error);
      })
  },
    [] //для только 1 запуска
  );

  return (
    <main className="content">
      {/* секция profile */}
      <section className="profile">
        <div
          onClick={handleEditAvatarClick}
          style={{ backgroundImage: `url(${currentUser.avatar || defaultAvatar})` }}
          className="profile__avatar">
        </div>
        <div className="profile__info">
          <div className="profile__nick-and-button">
            <h1 className="profile__nickname">{currentUser.name || 'Жак-Ив Кусто'}</h1>
            <button
              onClick={handleEditProfileClick}
              aria-label="открытие редактирования профиля"
              type="button"
              className="profile__edit-button button"
            ></button>
          </div>
          <p className="profile__description">{currentUser.about || 'Исследователь мирового океана'}</p>
        </div>
        <button
          onClick={handleAddPlaceClick}
          aria-label="открытие добавление новой карточки"
          type="button"
          className="profile__add-button button"
        ></button>
        {/* <!--? пока что нет скрипта для этого --> */}
      </section>
      {/* секция elements */}
      <section className="elements" key={'123'}>
        <ul className="elements__list-cards">
          {cards.map((item, index) => {
            return (
              <Card
                key={index}
                name={item.name}
                link={item.link}
                card={item}
                length={item.likes.length}
                onCardClick={props.onCardClick}
              />);
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
