import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/Onbording/AuthCheck";
import AnimatedRoutes from "./components/AnimatedRoutes";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
