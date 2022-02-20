import { Component } from "react"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import withRouter from '../../components/Helpers/withRouter'
import Loader from '../../components/UI/Loader/Loader'
import classes from './Quiz.module.css'
import {connect} from 'react-redux'
import {fetchQuizById} from '../../store/actions/quiz'

class Quiz extends Component {
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

  componentDidMount() {
    this.props.fetchQuizById(this.props.router.params.id)
  }
  
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.props.loading || this.props.quiz.length === 0
              ? <Loader />
              : this.props.isFinished
                  ? <FinishedQuiz 
                  quiz={this.props.quiz}
                  results={this.props.results}
                  onRetry={this.onRetry}
                  />
                  : <ActiveQuiz 
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  answerClickHandler={this.answerClickHandler}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  answerState={this.props.answerState}
                  />
          }
        </div>
      </div>
    )  
  }
}

function mapStateToProps(state) {
  return {
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz))