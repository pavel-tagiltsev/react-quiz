import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = (props) => {
  const getResultList = () => {
    return props.quiz.map((quizItem, index) => {
      const cls = [
        'fa',
        props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
        classes[props.results[quizItem.id]]
      ]

      return (
        <li key={index}>
          <strong>{index + 1}. </strong>
          {quizItem.question}
          <i className={cls.join(' ')}></i>
        </li>
      )
    })
  }

  const rightAnswers = Object.values(props.results)
    .filter((result) => result === 'success').length

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {getResultList()}
      </ul>

      <p>Правильно отвечено {rightAnswers} из {props.quiz.length}</p>

      <Button onClick={props.onRetry} type={'primary'}>Повторить</Button>
      <Link to='/'>
        <Button type={'success'}>Перейти в список тестов</Button>
      </Link>
    </div>
  )
}

export default FinishedQuiz