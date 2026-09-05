import { BrowserRouter , Route , Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import OnBoarding from './components/Onbording/OnBording';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/onboarding' element={<OnBoarding/>}/>
      </Routes>
      

      </BrowserRouter>
      

    </div>
  );
}

export default App;