import { BrowserRouter , Route , Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Onboarding from './components/Onbording/OnBording';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/onboarding' element={<Onboarding/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      
        
      </BrowserRouter>
      

    </div>
  );
}

export default App;