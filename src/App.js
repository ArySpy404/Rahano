import { BrowserRouter , Route , Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Onboarding from './components/Onbording/OnBording';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import WaitingPage from './components/Auth/Waiting-page';
import { AuthProvider } from './components/Onbording/AuthCheck';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/onboarding' element={<Onboarding/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/waitingPage' element={<WaitingPage/>}/>
      </Routes>
      
        
      </BrowserRouter>
      </AuthProvider>
      </div>
      

    
  );
}

export default App;