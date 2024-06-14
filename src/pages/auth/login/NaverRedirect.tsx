import { useNaverLoginQuery } from '@/hooks/reactQuery/auth/useSocialLoginQuery';
import Loading from '@/components/common/Loading';

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { isLoading } = useNaverLoginQuery(code);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <h1 className="text-36 font-bold underline">Naver Redirect Page</h1>
      )}
    </div>
  );
};

export default NaverRedirect;
