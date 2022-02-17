import Layout from './hoc/Layout/Layout'
import {Routes, Route} from 'react-router-dom'
import Quiz from './container/Quiz/Quiz';
import QuizList from './container/QuizList/QuizList';
import QuizCreator from './container/QuizCreator/QuizCreator';
import Auth from './container/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/auth' element={<Auth />}/>
          <Route path='/quiz-creator' element={<QuizCreator />}/>
          <Route path='/quiz/:id' element={<Quiz />}/>
          <Route path='/' element={<QuizList />}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App
