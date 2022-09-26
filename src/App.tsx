import { Route, Routes } from 'react-router-dom';

import { LoginPage, MainPage, RegisterPage } from '@Page/.';

function App() {
  return (
    <Routes>
      <Route
        path='/main'
        element={<MainPage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/register'
        element={<RegisterPage />}
      />
    </Routes>
  );
}
export default App;
