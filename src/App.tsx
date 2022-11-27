import { Route, Routes } from 'react-router-dom';

import './App.css';
import { WordView, MainView, PresentationView } from './Component';

import { LoginPage, MainPage, PrivatePage, RegisterPage } from '@Page/.';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainPage />}
      >
        <Route
          path='/home'
          element={<MainView body='HOME' />}
        />
        <Route
          path='/archive'
          element={<MainView body='ARCHIVE' />}
        />
        <Route
          path='/create/word'
          element={<WordView />}
        />
        <Route
          path='/create/presentation'
          element={<PresentationView />}
        />
      </Route>
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
