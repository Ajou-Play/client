import { Route, Routes } from 'react-router-dom';

import './App.css';
import { LoginPage, MainPage, PrivatePage, RegisterPage } from '@Page/.';

function App() {
  return (
    <Routes>
      <Route
        path='/main'
        element={<MainPage />}
      />
      <Route
        path='/login'
        element={<PrivatePage component={LoginPage} />}
      />
      <Route
        path='/register'
        element={<PrivatePage component={RegisterPage} />}
      />
    </Routes>
  );
}
export default App;
