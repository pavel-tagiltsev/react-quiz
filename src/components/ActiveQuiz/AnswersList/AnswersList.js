import AnswersItem from './AnswersItem/AnswersItem'
import classes from './AnswersList.module.css'

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      { props.answers.map((answer, index) => {
        return (
          <AnswersItem 
            key={index}
            answer={answer}
            answerClickHandler={props.answerClickHandler}
            answerState={props.answerState ? props.answerState[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList