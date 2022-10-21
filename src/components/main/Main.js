
import React from "react";
import defaultAvatar from '../../images/avatar.png'

//? импорт вспомогательных классов/объектов
import { api } from './../../utils/Api.js';

//? импорт компонентов
import Card from './../card/Card.js';


//? импорт данных о пользователе
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

  function handleCardLike(card) {
    //? Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card, currentUser._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса лайка карточки');
        console.log('Id: ', card._id);
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    //? Отправляем запрос в API на удаление карточки
    api.deleteCard(card)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? false : true))
        )
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log('Ошибка во время запроса на удаление карточки');
        console.log('Id: ', card._id);
        console.log(error);
      })
  }

  return (
    <main className="content">
      {/* секция profile */}
      <section className="profile" key={'1'}>
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
      <section className="elements" key={'2'}>
        <ul className="elements__list-cards">
          {cards.map((item, index) => {
            return (
              <Card
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
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
