import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverRedirect = () => {
  // const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    // back-end로 인가 코드 전달
    const NaverLogin = async () => {
      //   const res = await axios.post(`back에서 설정한 api address`);
    };
    NaverLogin();
    navigate('/', { replace: true });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Naver Redirect Page</h1>
    </div>
  );
};

export default NaverRedirect;
