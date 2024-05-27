import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Main from '@/pages/Main';
import CheckoutPage from '@/components/payments/CheckoutPage';
import SuccessPage from '@/components/payments/SuccessPage';
import FailPage from '@/components/payments/FailPage';
import MyPage from '@/pages/MyPage';
import Location from '@/pages/productRegist/location/Location';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="login">
            <Route index element={<Login />} />
          </Route>
          <Route path="location">
            <Route index element={<Location />} />
          </Route>
          <Route path="mypage">
            <Route index element={<MyPage />} />
          </Route>
          <Route path="payments">
            <Route index element={<CheckoutPage />} />
            <Route path="success" element={<SuccessPage />} />
            <Route path="fail" element={<FailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
