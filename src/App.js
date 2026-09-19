import { BrowserRouter , Route , Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Onboarding from './components/Onbording/OnBording';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/onboarding' element={<Onboarding/>}/>
        <Route path='/Auth' element={<Auth/>}/>
      </Routes>
      
        
      </BrowserRouter>
      

    </div>
  );
}

export default App;