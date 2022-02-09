import { Component } from "react"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import classes from './Quiz.module.css'

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        question: 'Как тебя зовут?',
        rightAnswerId: 2,
        answers: [
          {text: 'Вера', id: 1},
          {text: 'Павел', id: 2},
          {text: 'Стас', id: 3},
          {text: 'Артем', id: 4}
        ]
      },
      {
        id: 2,
        question: 'Сколько тебе лет?',
        rightAnswerId: 4,
        answers: [
          {text: '5', id: 1},
          {text: '7', id: 2},
          {text: '9', id: 3},
          {text: '26', id: 4}
        ]
      }
    ]
  }

  answerClickHandler = (answerId) => {
    console.log(answerId)
    this.setState({
      activeQuestion: this.state.activeQuestion + 1
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
            <ActiveQuiz 
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              answerClickHandler={this.answerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
            />
        </div>
      </div>
    )  
  }
}

export default Quiz;