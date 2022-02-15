import classes from './FinishedQuiz.module.css'

const FinishedQuiz = (props) => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          How are you?
          <i className={'fa fa-times ' + classes.error}></i>
        </li>
        <li>
          <strong>2. </strong>
          How are you?
          <i className={'fa fa-check ' + classes.success}></i>
        </li>
      </ul>

      <p>Правильно отвечено 4 из 10</p>

      <button>Повторить</button>
    </div>
  )
}

export default FinishedQuiz