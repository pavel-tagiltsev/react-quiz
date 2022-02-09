import Layout from './hoc/Layout/Layout'
import Quize from './container/Quize/Quize';

function App() {
  return (
    <div className="App">
      <Layout>
        <Quize />
      </Layout>
    </div>
  );
}

export default App
