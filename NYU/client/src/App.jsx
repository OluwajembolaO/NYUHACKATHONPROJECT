import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Form from './pages/Form/Form.jsx'
import Score from './pages/Score/Score.jsx'
import HomePage from './pages/HomePage/HomePage.jsx';
function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/form" element={<Form />} />
          <Route path="/score" element={<Score />} />
        </Routes>
    </Router>
      
  );
}


export default App;
