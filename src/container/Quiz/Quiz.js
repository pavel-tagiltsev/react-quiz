import { Component } from "react"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import withRouter from '../../components/Helpers/withRouter'
import classes from './Quiz.module.css'

class Quiz extends Component {
  state = {
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    results: {},
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
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if(this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (answerId === question.rightAnswerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({isFinished: true})
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        
        window.clearTimeout(timeout)
      }, 1500)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished = () => {
    return this.state.quiz.length === this.state.activeQuestion + 1
  }

  onRetry = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {},
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished 
              ? <FinishedQuiz 
              quiz={this.state.quiz}
              results={this.state.results}
              onRetry={this.onRetry}
              />
              : <ActiveQuiz 
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              answerClickHandler={this.answerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
              />
          }
        </div>
      </div>
    )  
  }
}

export default withRouter(Quiz);