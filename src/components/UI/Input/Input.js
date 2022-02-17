import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${props.type}-${Math.round()}`

  return (
    <div className={cls.join(' ')}>
      <label
        htmlFor={htmlFor}
      >
        {props.label}
      </label>
      <input 
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

export default Input