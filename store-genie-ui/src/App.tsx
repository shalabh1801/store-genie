import { Navigate } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainApp from './app/components/MainApp';
import Auth from './auth/components/Auth';
import { AuthProvider } from './common/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/auth' />}></Route>
          <Route path='/auth/*' element={<Auth />}></Route>
          <Route path='/app/*' element={<MainApp />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
