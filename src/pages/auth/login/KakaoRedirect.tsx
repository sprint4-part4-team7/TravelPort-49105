import { useKakaoLoginQuery } from '@/hooks/reactQuery/auth/useSocialLoginQuery';
import Loading from '@/components/common/Loading';

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { isLoading } = useKakaoLoginQuery(code);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <h1 className="text-36 font-bold underline">Kakao Redirect Page</h1>
      )}
    </div>
  );
};

export default KakaoRedirect;
