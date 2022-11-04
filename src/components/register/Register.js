import SingForm from '../signForm/SignForm.js';

function Register() {
  return (
    <section className="sign">
      <article className="sign__container">
        <SingForm
          formTitle={'Регистрация'}
          submitTitle={'Зарегистрироваться'}
        />
        <h3 className="sign__already-registered">
          Уже зарегистрированы ? <span className='button'><a className='sign__link' href='/sign-in'>Войти</a></span>
        </h3>
      </article>
    </section>
  )
}

export default Register;
