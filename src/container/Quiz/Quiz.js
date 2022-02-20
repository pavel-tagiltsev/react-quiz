import { Component } from "react"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import withRouter from '../../components/Helpers/withRouter'
import Loader from '../../components/UI/Loader/Loader'
import classes from './Quiz.module.css'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.router.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
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
                  onRetry={this.props.retryQuiz}
                  />
                  : <ActiveQuiz 
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  answerClickHandler={this.props.quizAnswerClick}
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
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz))