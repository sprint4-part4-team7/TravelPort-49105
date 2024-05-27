import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Reservation from './pages/Reservation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="login">
            <Route index element={<Login />} />
          </Route>
          <Route path="reservation">
            <Route index element={<Reservation />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
