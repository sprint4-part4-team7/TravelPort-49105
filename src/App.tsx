import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import Main from '@/pages/Main';
import CheckoutPage from '@/pages/payments/CheckoutPage';
import SuccessPage from '@/pages/payments/SuccessPage';
import FailPage from '@/pages/payments/FailPage';
import MyPage from '@/pages/MyPage';
import List from '@/pages/List';
import GoogleRedirect from '@/pages/auth/login/GoogleRedirect';
import KakaoRedirect from '@/pages/auth/login/KakaoRedirect';
import NaverRedirect from '@/pages/auth/login/NaverRedirect';
import PartnerSignup from '@/pages/auth/signup/PartnerSignup';
import UserSignup from '@/pages/auth/signup/UserSignup';
import ProductDetails from '@/pages/ProductDetails';
import ProductRegist from '@/pages/productRegist/ProductRegist';
import SearchResultPage from '@/pages/SearchResultPage';
import ReviewRegist from './pages/ReviewRegist';
import ReservationManagement from '@/pages/ReservationManagement';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
        </Route>
        <Route path="login">
          <Route index element={<Login />} />
          <Route path="oauth">
            <Route path="google" element={<GoogleRedirect />} />
            <Route path="kakao" element={<KakaoRedirect />} />
            <Route path="naver" element={<NaverRedirect />} />
          </Route>
        </Route>
        <Route path="signup">
          <Route path="user" element={<UserSignup />} />
          <Route path="partner" element={<PartnerSignup />} />
        </Route>
        <Route path="list">
          <Route index element={<List />} />
        </Route>
        <Route path="details">
          <Route index element={<ProductDetails />} />
        </Route>
        <Route path="product-regist">
          <Route index element={<ProductRegist />} />
        </Route>
        <Route path="mypage/:status" element={<MyPage />} />
        <Route path="payments">
          <Route index element={<CheckoutPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="fail" element={<FailPage />} />
        </Route>
        <Route path="review">
          <Route index element={<ReviewRegist />} />
        </Route>
        <Route path="search">
          <Route index element={<SearchResultPage />} />
        </Route>
        <Route path="manage">
          <Route index element={<ReservationManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
