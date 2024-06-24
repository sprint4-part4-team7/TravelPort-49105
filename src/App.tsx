import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/auth/login/Login';
import Main from '@/pages/user/Main';
import CheckoutPage from '@/pages/user/payments/CheckoutPage';
import SuccessPage from '@/pages/user/payments/SuccessPage';
import FailPage from '@/pages/user/payments/FailPage';
import MyPage from '@/pages/MyPage';
import List from '@/pages/user/List';
import GoogleRedirect from '@/pages/auth/login/GoogleRedirect';
import KakaoRedirect from '@/pages/auth/login/KakaoRedirect';
import NaverRedirect from '@/pages/auth/login/NaverRedirect';
import PartnerSignup from '@/pages/auth/signup/PartnerSignup';
import UserSignup from '@/pages/auth/signup/UserSignup';
import ProductDetails from '@/pages/user/ProductDetails';
import ProductRegister from '@/pages/partner/productRegister/ProductRegister';
import SearchResultPage from '@/pages/user/SearchResultPage';
import ReviewRegist from '@/pages/user/review/ReviewRegist';
import PartnerMain from '@/pages/partner/PartnerMain';
import NoPage from '@/pages/NoPage';
import PreparingPage from '@/pages/PreparingPage';
import Cart from '@/pages/user/cart/Cart';
import CheckoutCartPage from '@/pages/user/payments/CheckoutCartPage';
import ProtectedRoute from './components/common/ProtectedRoute';

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
        <Route path="list/:categoryId">
          <Route index element={<List />} />
        </Route>
        <Route path="details/:categoryId/:productId">
          <Route index element={<ProductDetails />} />
        </Route>
        <Route
          path="mypage/:status"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route path="partner/">
          <Route
            index
            element={
              <ProtectedRoute partner>
                <PartnerMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/:status"
            element={
              <ProtectedRoute partner>
                <MyPage isPartner />
              </ProtectedRoute>
            }
          />
          <Route
            path="product-register"
            element={
              <ProtectedRoute partner>
                <ProductRegister />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="payments">
          <Route
            index
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <CheckoutCartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="success"
            element={
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="fail"
            element={
              <ProtectedRoute>
                <FailPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="review/:optionId/:reviewId?"
          element={
            <ProtectedRoute>
              <ReviewRegist />
            </ProtectedRoute>
          }
        />
        <Route path="search">
          <Route index element={<SearchResultPage />} />
        </Route>
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoPage />} />
        {/* 서비스 준비중 페이지  */}
        <Route path="preparing" element={<PreparingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
