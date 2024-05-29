import { useEffect } from 'react';

const GoogleRedirect = () => {
  //   const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // back-end로 인가 코드 전달
    const GoogleLogin = async () => {
      //   const res = await axios.post(`back에서 설정한 api address`);
    };
    GoogleLogin();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Google Redirect Page</h1>
    </div>
  );
};

export default GoogleRedirect;
