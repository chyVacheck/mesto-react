import SingForm from '../signForm/SignForm.js';

function Register() {
  return (
    <section className="sign">
      <article className="sign__container">
        <SingForm
          formTitle={'Регистрация'}
          submitTitle={'Зарегистрироваться'}
          id={'register'}
        />
        <h3 className="sign__already-registered">
          Уже зарегистрированы ? <a className='link' href='/sign-in'>Войти</a>
        </h3>
      </article>
    </section>
  )
}

export default Register;
