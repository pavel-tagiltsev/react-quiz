import classes from './AnswersItem.module.css'

const AnswersItem = (props) => {
  return (
    <li 
      className={classes.AnswersItem}
      onClick={() => props.answerClickHandler(props.answer.id)}>
      {props.answer.text}
    </li>
  )
}

export default AnswersItem