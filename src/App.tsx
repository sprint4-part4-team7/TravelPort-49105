import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="login">
            <Route index element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
