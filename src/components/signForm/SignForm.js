
import useForm from '../hooks/useForm.js';

function SingForm({ onSubmit, formTitle, submitTitle }) {

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  return (
    <form
      className='sign__form'
      onSubmit={onSubmit}
      name='sing-form'
      id='sing-form'
    >
      <h3 className="sign__title">{formTitle}</h3>
      {/*todo noValidate */}
      {/* all inputs */}
      {/* email */}
      <div className='sign__field'>
        <input
          className='sign__input'
          value={values.email || ''}
          onChange={handleChange}
          name='email'
          type='email'
          minLength={2}
          maxLength={40}
          required={true}
          placeholder='Email'
        />
      </div>
      {/* password */}
      <div className='sign__field'>
        <input
          className='sign__input'
          value={values.password || ''}
          onChange={handleChange}
          name='password'
          type='password'
          minLength={2}
          maxLength={40}
          required={true}
          placeholder='Пароль'
        />
      </div>
      {/* submit */}
      <button
        //todo сделать валидацию и убрать коментрарий disabled
        type="submit"
        id={'sing-button-submit'}
        className="sign__submit-button button" //todo сделать валидацию и поставить модификатор invalid
      >
        {submitTitle}
      </button>
    </form>
  )
}

export default SingForm;
