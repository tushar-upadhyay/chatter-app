import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { HomeScreen } from './screens/home-screen';
import { LoginScreen } from './screens/login-screen';
import { ProtectedRoutes } from './components/protected-route';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<HomeScreen />} />
        </Route>
        
        <Route path='/login' element = {<LoginScreen />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
