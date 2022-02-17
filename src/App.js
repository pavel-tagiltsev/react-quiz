import Layout from './hoc/Layout/Layout'
import {Switch, Route} from 'react-router-dom'
import Quiz from './container/Quiz/Quiz';
import QuizList from './container/QuizList/QuizList';
import QuizCreator from './container/QuizCreator/QuizCreator';
import Auth from './container/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/' component={QuizList}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App
