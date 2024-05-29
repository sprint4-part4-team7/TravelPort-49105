import { useEffect } from 'react';

const KakaoRedirect = () => {
  //   const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // back-end로 인가 코드 전달
    const KakaoLogin = async () => {
      //   const res = await axios.post(`back에서 설정한 api address`);
    };
    KakaoLogin();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Kakao Redirect Page</h1>
    </div>
  );
};

export default KakaoRedirect;
