import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>2.</strong>&nbsp;
          {props.question}
        </span>
        <small>{props.answerNumber} из {props.quizLength}</small>
      </p>

      <AnswersList 
        answers={props.answers}
        answerClickHandler={props.answerClickHandler}
      />
    </div>
  )
}

export default ActiveQuiz