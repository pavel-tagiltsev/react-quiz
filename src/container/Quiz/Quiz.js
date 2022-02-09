import { Component } from "react"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import classes from './Quiz.module.css'

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'Как тебя зовут?',
        rightAnswerId: 2,
        answers: [
          {text: 'Вера', id: 1},
          {text: 'Павел', id: 2},
          {text: 'Стас', id: 3},
          {text: 'Артем', id: 4}
        ]
      }
    ]
  }

  answerClickHandler = (answerId) => {
    console.log(answerId)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
            <ActiveQuiz 
              answers={this.state.quiz[0].answers}
              question={this.state.quiz[0].question}
              answerClickHandler={this.answerClickHandler}
            />
        </div>
      </div>
    )  
  }
}

export default Quiz;