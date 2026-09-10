import { BrowserRouter , Route , Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import OnBoardingStep1 from './components/Onbording/OnBordingStep1';
import Auth from './components/Auth/Auth';
import WehereAreyou from './components/Onbording/WhereAreYou';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/onboarding/Step1' element={<OnBoardingStep1/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/onbording/Step2' element={<WehereAreyou/>}/>
      </Routes>
      
        
      </BrowserRouter>
      

    </div>
  );
}

export default App;