import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import List from './pages/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="login">
            <Route index element={<Login />} />
          </Route>
          <Route path="list">
            <Route index element={<List />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
